import torch

from flask import Flask
import ghhops_server as hs
import rhino3dm as rh
from main import modelDec
import pathlib
import sys
from readData import readData

# register hops app as middleware
app = Flask(__name__)
hops = hs.Hops(app)

device = torch.device('cpu')


# Specify a path of model
PATH = str(pathlib.Path(__file__).parent.resolve()) + "/modelDec.pt"
print(PATH)

modelDec.load_state_dict(torch.load(PATH, map_location=device))
modelDec.eval()


path = r'C:\\Users\\ebauscher\\OneDrive - Foster + Partners\\eb\\GradShow\\midi_new\\1planes6rotLin/'
numGraphs = 400
_, _, allGraphs = readData(path, numGraphs)





@hops.component(
    "/reconstruct",
    name="reconstruct",
    description="re con struct yeew",
    inputs=[
        hs.HopsInteger("i", "recon index", "index of the graph to reconstruct"),
    ],
    outputs=[
        hs.HopsMesh("meshes", "m", "mahhhhh", access=hs.HopsParamAccess.LIST)
    ]
)

def reconstruct(recon_ind):
    srfs = []
    data = allGraphs[recon_ind]
    recon = model(data).detach().cpu().numpy()
    mesh = rh.Mesh()
    for sub in recon:
        mesh.Vertices.Add(sub[0], sub[1], sub[2])
        mesh.Vertices.Add(sub[3], sub[4], sub[5])

    mesh2 = rh.Mesh()
    for sub in data.x:
        mesh2.Vertices.Add(sub[0], sub[1], sub[2])
        mesh2.Vertices.Add(sub[3], sub[4], sub[5])

    srfs= [mesh, mesh2]
    return srfs

@hops.component(
    "/dream",
    name="dream",
    description="d r e a m",
    inputs=[
        hs.HopsNumber("p", "coordinates", "3d coordinates of latent space", access=hs.HopsParamAccess.LIST),
    ],
    outputs=[
        hs.HopsMesh("meshes", "m", "mahhhhh", access=hs.HopsParamAccess.LIST)
    ]
)

def dream(coor):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    data = torch.tensor(coor, dtype=torch.float).to(device)
    recon = modelDec(data).detach().cpu().numpy()
    
    srfs = []
    mesh = rh.Mesh()
    for sub in recon:
        mesh.Vertices.Add(sub[0], sub[1], sub[2])
        mesh.Vertices.Add(sub[3], sub[4], sub[5])
        mesh.Vertices.Add(sub[6], 0, 0) # sub[7], sub[8])

    srfs.append(mesh)
    print(srfs)
    return srfs


if __name__ == "__main__":
    app.run(debug=True)