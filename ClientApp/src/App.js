import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react"


const App = () => {

    const [tasks, setTasks] = useState([])
    const [payload, setPayload] = useState("")




    const showTaks = async () => {
        const response = await fetch("api/task/List");
        if (response.ok) {
            const data = await response.json()
            setTasks(data)
        } else {
            console.log("There was a problem...", response.status)
        }
    }

    const format = (str) => {
        let options = { year: "numeric", month: "long", day: "numeric" }
        let date = new Date(str).toLocaleDateString("es-EN", options)
        let time = new Date(str).toLocaleTimeString()
        return date + " | "+ time 
    }



    useEffect(() => {
        showTaks()
    }, [])

    const saveTask = async (e) => {
        e.preventDefault()
        const res = await fetch("api/task/save", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json;charset=utf-8"
            },
            body: JSON.stringify({payload : payload})
        })
        if (res.ok) {
            setPayload("")
            await showTaks()
        }
    }

    const deleteTask = async (id) => {
        const res = await fetch(`api/task/Delete/`+id, {
            method: "DELETE"
        })
        if (res.ok) {
            await showTaks()
        }
    }

    return (
        <div className="container bg-dark p-4 vh-100">
            <h2 className="text-white"> Task list </h2>
            <div className="row">
                <div className="col-sm-12">
                    <form onSubmit={saveTask} >
                        <div className="input-group">
                            <input type="text"
                                className="form-control"
                                placeholder="Type the description of the task"
                                value={payload }
                                onChange={(e) => setPayload(e.target.value)}
                            />

                           
                             <button className="btn btn-success" type="submit">Add</button>
                        </div>

                    </form>
                

                </div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-12">
                    <div className="list-group">
                        {
                            tasks.map((item) => (
                                <div key={item.IdTask} className="list-group-item list-group-item-action">
                                    <h5 className="text-primary">{item.payload}</h5>
                                    <div className="d-flex justify-content-between">
                                        <small className="text-muted">{format(item.registerDate)}</small>
                                        <button onClick={() => deleteTask(item.idTask)} className="btn btn-sm btn-outline-danger">Close</button>
                                    </div>
                                </div>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
     )
}


export default App