import {useState, useEffect} from "react";
import {Table, Button} from "react-bootstrap";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [listElements, setListElements] = useState();

  useEffect(() => {
    setListElements(taskData);
  }, [tasks])

  const fetchTasks = () => {
    axios.get("https://localhost:44342/api/Task").then((response) => {
      setTasks(response.data);
      console.log(response.data);
    })
  }

  let taskData = tasks.map((task) => {
    console.log(task.Description, task.TotalHoursNeeded, task.Status, task.Username);
    return (
      <tr key={task.Id}>
        <td>{task.Description}</td>
        <td>{task.TotalHoursNeeded}</td>
        <td>{task.Status}</td>
        <td>{task.Username}</td>
        <td>{task.DateCreated}</td>
        <td>{task.DateUpdated}</td>
      </tr>
    );
  })

  return (
    <div className="container">
      <h1>Tasks</h1>
      <Table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Time</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Date Created</th>
            <th>Date Updated</th>
          </tr>
        </thead>
        <tbody key="task-table-body">
            {listElements}
        </tbody>
      </Table>
      <Button color="success">Create</Button>
      <Button color="success" onClick={fetchTasks}>Read</Button>
      <Button color="danger">Update</Button>
      <Button color="danger">Delete</Button>
    </div>
  );
}

export default App;