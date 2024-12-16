import torch
import pandas as pd
from torch_geometric.data import Data
import random
import time
from tqdm import tqdm

def readData(path, numGraphs, labels=False):
    # define dataset location and size
    #path = r'C:\\Users\\erikb\\Dropbox\\Studium\\thesis\\csv\\Dcurrent/'
    #numGraphs = 400

    #read graphs from saved csv
    allGraphs = []
    print("reading data...")
    for i in tqdm(range(numGraphs)):
        nodes = pd.read_csv(path + str(i)  + "nodeFeatures.csv", header=None)
        edges = pd.read_csv(path + str(i)  + "adjacencyMatrix.csv", header=None) 
        
        nodeFeatures = nodes.to_numpy()
        edgesMatrix = edges.to_numpy()
            
        x = torch.tensor(nodeFeatures, dtype=torch.float, requires_grad = True)
        edge_index = torch.tensor(edgesMatrix, dtype=torch.long)
        
        if labels:
            nodeLabels = pd.read_csv(path + str(i) + "nodeLabels.csv", header=None) 
            nodeLabels = labels.to_numpy()
            y = torch.tensor(nodeLabels, dtype=torch.float)
            data = Data(x=x, edge_index=edge_index, y=y)
        else:
            data = Data(x=x, edge_index=edge_index)
        
        allGraphs.append(data)

    random.seed(int(time.time()))
    toShuffle = list(enumerate(allGraphs))
    random.shuffle(toShuffle)
    indices, shuffledGraphs = zip(*toShuffle)
    train = shuffledGraphs[:int(numGraphs*0.8)]
    validate = shuffledGraphs[int(numGraphs*0.8):]
    return (train, validate, allGraphs)