from torch.utils.tensorboard import SummaryWriter
import datetime
import numpy as np

class logger:
    def __init__(self, channels, epochs, lr, logPath):
        # initialise summary writer
        now = datetime.datetime.now()
        date =  now.strftime("%y") + now.strftime("%m") + now.strftime("%d") + "-" + now.strftime("%H") + now.strftime("%M") + now.strftime("%S")
        channelDescription = "_"
        for ind, channel in enumerate(channels):
            if ind: channelDescription += "-"
            channelDescription += str(channel) 
        writerName = date + "_epochs" + str(epochs) + "_lr" + str(lr) + channelDescription
        self.writer = SummaryWriter(logPath + writerName)

    def writeSkalar(self, description, skalar, epoch):
        self.writer.add_scalar(description, skalar, epoch)

    def close(self):
        self.writer.close()

def latent(modelEnc, allGraphs, p):
    f = open(p + "latent.csv", "w")
    f.close()
    f = open(p + "latent.csv", "a")
    for data in allGraphs:
        z = modelEnc(data).detach().cpu().numpy()
        z = np.around(z, 5)        
        # check if the encoder takes 
        # one element at the time or 
        # one whole graph (different dimension)
        if len(z.shape) == 2:
            for ele in z:
                ele = np.array2string(ele, max_line_width=100000, separator=",")
                ele = ele[1:len(ele)-1]
                f.write(ele + "\n")
        else:
            z = np.array2string(z, max_line_width=100000, separator=",")   
            z = z[1:len(z)-1]
            f.write(z + "\n")

        

    f.close()
    print("latent file saved!")
