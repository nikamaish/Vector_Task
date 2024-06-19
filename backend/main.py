from fastapi import FastAPI, HTTPException # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from pydantic import BaseModel # type: ignore
from typing import List
import networkx as nx

app = FastAPI()

# CORS settings
origins = [
    "http://localhost:3000",  # Frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[str]
    edges: List[List[str]]

@app.post('/pipelines/parse', response_model=dict)
def parse_pipeline(data: PipelineData):
    try:
        # Calculate number of nodes and edges
        num_nodes = len(data.nodes)
        num_edges = len(data.edges)

        # Determine if the pipeline forms a DAG
        graph = nx.DiGraph()
        graph.add_nodes_from(data.nodes)
        graph.add_edges_from(data.edges)

        is_dag = nx.is_directed_acyclic_graph(graph)

        # Return response
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_dag,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
