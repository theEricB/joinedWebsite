import torch
import pandas as pd
from torch.nn import Linear, Unflatten
from torch_geometric.nn import GCNConv, SAGEConv, Set2Set, NNConv, CGConv
from torch_geometric.data import Data
from torch_geometric.nn.pool import SAGPooling, EdgePooling, ASAPooling, global_mean_pool

num_feat = 9
num_nodes = 21

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')



# onnx encoder
class enc(torch.nn.Module):
    def __init__(self, dim_in, dim_hidden, dim_latent):
        super(enc, self).__init__()

        self.dim_in = dim_in
        
        # message passing
        self.conv1 = SAGEConv(dim_in, dim_hidden)
        self.conv2 = SAGEConv(dim_hidden, dim_hidden)
        self.conv3 = SAGEConv(dim_hidden, dim_hidden)

        self.pool = SAGPooling(dim_hidden, 1)
        self.reduceGlobal = Linear(dim_hidden, dim_latent)



    def encode(self, data):
        x, edge_index = data.x, data.edge_index
        x = self.conv1(x, edge_index)
        x = x.relu()
        x = self.conv2(x, edge_index)
        x = x.relu()
        x = self.conv3(x, edge_index)
        x = x.relu()
        x = global_mean_pool(x, batch=None)
        x = self.reduceGlobal(x)
        x = x.sigmoid()
        return x

    def forward(self, data):
        return self.encode(data)

    


# onnx decoder
class dec(torch.nn.Module):
    def __init__(self, dim_in, dim_hidden, dim_latent):
        super(dec, self).__init__()
        self.dim_in = dim_in

        # decoder
        self.dec1 = Linear(dim_latent, 64)
        self.dec2 = Linear(64, 128)
        self.dec3 = Linear(128, 512)
        self.dec4 = Linear(512, dim_in*num_nodes)

    
    def decode(self, x):
        x = self.dec1(x)
        x = x.relu()
        x = self.dec2(x)
        x = x.relu()
        x = self.dec3(x)
        x = x.relu()
        x = self.dec4(x)
        x = torch.reshape(x, [num_nodes, self.dim_in])
        return x
    
    def forward(self, data):
        return self.decode(data)
    




# version 2: include local and global features in the latent space vector
class GNNlocal(torch.nn.Module):
    def __init__(self, dim_in, dim_hidden, dim_latent):
        super(GNNlocal, self).__init__()

        self.dim_in = dim_in
        
        # message passing
        self.conv1 = SAGEConv(dim_in, dim_hidden)
        self.conv2 = SAGEConv(dim_hidden, dim_hidden)
        self.conv3 = SAGEConv(dim_hidden, dim_hidden)

        self.pool = SAGPooling(dim_hidden, 1)
        self.reduceGlobal = Linear(dim_hidden, dim_latent)

        # decoder
        self.dec1 = Linear(dim_latent, 64)
        self.dec2 = Linear(64, 128)
        self.dec3 = Linear(128, 512)
        self.dec4 = Linear(512, dim_in*num_nodes)


    def encode(self, data):
        x, edge_index = data.x, data.edge_index
        x = self.conv1(x, edge_index)
        x = x.relu()
        x = self.conv2(x, edge_index)
        x = x.relu()
        x = self.conv3(x, edge_index)
        x = x.relu()
        #x, edge_index,_,_,_,_ = self.pool(x, edge_index)
        x = global_mean_pool(x, batch=None)
        x = self.reduceGlobal(x)
        x = x.sigmoid()

        return x
    
    def decode(self, x):
        x = self.dec1(x)
        x = x.relu()
        x = self.dec2(x)
        x = x.relu()
        x = self.dec3(x)
        x = x.relu()
        x = self.dec4(x)
        x = torch.reshape(x, [num_nodes, self.dim_in])
        return x
    
    def forward(self, data):
        z = self.encode(data)
        return self.decode(z)
    
