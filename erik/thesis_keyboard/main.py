import torch
import pandas as pd
from torch_geometric.data import Data
from torch_geometric.utils import to_undirected
from models import enc, dec, GNNlocal
import pathlib
import numpy as np

from readData import readData

device = torch.device('cpu')


thisPath = str(pathlib.Path(__file__).parent.resolve()) + "/"

# define model and hyperparameters
channels = []
epochs = 400
lr = 0.001  #0.001
weightDecay = 0.001  #0.001

#model = GNNlocal(7, 64, 3).to(device)
modelEnc = enc(7, 64, 3).to(device)
modelDec = dec(7, 64, 3).to(device)

optimizerEnc = torch.optim.Adam(modelEnc.parameters(), lr=lr, weight_decay=weightDecay)
optimizerDec = torch.optim.Adam(modelDec.parameters(), lr=lr, weight_decay=weightDecay)
criterion = torch.nn.MSELoss()






if __name__ == "__main__":
    from logger import logger, latent
    # initialise summary writer
    logPath = thisPath + "runs/"
    writer = logger(channels, epochs, lr, logPath)

    # define dataset location and size
    path = r'C:\\Users\\ebauscher\\OneDrive - Foster + Partners\\eb\\GradShow\\midi_new\\1planes6rotLin/'
    numGraphs = 400
    print(path)
    train, validate, allGraphs = readData(path, numGraphs)
    print("train: ", len(train), ", validate: ", len(validate))


    for epoch in range(epochs):
        
        # train
        #model.train()
        modelEnc.train()
        modelDec.train()
        train_loss = 0
        val_loss = 0
        for data in train:
            data = data.to(device)
            optimizerEnc.zero_grad()
            optimizerDec.zero_grad()
            #out = model(data).to(device)
            out = modelDec(modelEnc(data)).to(device)
            loss = criterion(data.x, out)
            loss.backward()
            optimizerEnc.step()
            optimizerDec.step()
            train_loss += loss
        train_loss /= len(train)
        writer.writeSkalar('Loss/train', train_loss, epoch)

        # evaluate
        #model.eval()
        modelEnc.eval()
        modelDec.eval()
        for data in validate:
            data = data.to(device)
            #out = model(data)
            out = modelDec(modelEnc(data)).to(device)
            loss = criterion(data.x, out)
            val_loss += loss
        val_loss /= len(validate)
        writer.writeSkalar('Loss/validate', val_loss, epoch)


        if not epoch%10:
            print("epoch:", epoch, " - train_loss:", train_loss.detach().cpu().numpy(), " - val_loss: ", val_loss.detach().cpu().numpy())        
        
    writer.close()
    
    latent(modelEnc, allGraphs, thisPath)

    # save onnx model for js
    dummy_input = torch.zeros(1,3)
    torch.onnx.export(modelDec, dummy_input, "onnx_model.onnx", verbose=True)


    # Specify a path
    PATH = thisPath + "model.pt"
    PATH2 = thisPath + "modelEnc.pt"
    PATH3 = thisPath + "modelDec.pt"



    # Save
    torch.save(modelEnc.state_dict(), PATH2)
    torch.save(modelDec.state_dict(), PATH3)

    print("models saved!")