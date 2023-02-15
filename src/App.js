import {useState, useEffect} from "react";
import {Table, Button, Form, Stack, Modal} from "react-bootstrap";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [listElements, setListElements] = useState();

  const [description, setDescription] = useState("");
  const [totalHoursNeeded, setTotalHoursNeeded] = useState("");
  const [status, setStatus] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    setListElements(taskData);
  }, [tasks])

  const fetchTasks = () => {
    axios.get("https://localhost:44342/api/Task").then((response) => {
      setTasks(response.data);
    })
  }

  const deleteTask = (id) => {
    axios.delete("https://localhost:44342/api/Task?id=" + id).then(() => {
      setTasks(tasks.filter((task) => task.Id !== id));
    })
  }

  const createTask = (e) => {
    e.preventDefault();
    const newTask = {
      Description: description,
      TotalHoursNeeded: totalHoursNeeded,
      Status: status,
      Username: username
    };
    axios.post("https://localhost:44342/api/Task", newTask).then((response) => {
      setTasks([...tasks, response.data]);
      setDescription("");
      setTotalHoursNeeded("");
      setStatus("");
      setUsername("");
      fetchTasks();
    })
  }

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const updateTask = (id) => {
    const newTask = {
      Description: description,
      TotalHoursNeeded: totalHoursNeeded,
      Status: status,
      Username: username
    };
    axios.put("https://localhost:44342/api/Task?id=" + id, newTask).then(() => {
      const updatedTasks = tasks.map(task => {
        if (task.Id === id) {
          return {
            ...task,
            Description: description,
            TotalHoursNeeded: totalHoursNeeded,
            Status: status,
            Username: username,
          };
        } else {
          return task;
        }
      });
      setTasks(updatedTasks);
      handleCloseModal();
    });
  };

  let taskData = tasks.map(task => {
    return (
      <tr key={task.Id}>
        <td>{task.Description}</td>
        <td>{task.TotalHoursNeeded}</td>
        <td>{task.Status}</td>
        <td>{task.Username}</td>
        <td>
          <Stack direction="horizontal" gap={1}>
            <Button variant="warning" onClick={handleShowModal}>Update</Button>
            <Button variant="danger" onClick={() => deleteTask(task.Id)}>Delete</Button>
          </Stack>
        </td>
      </tr>
    );
  })

  return (
    <div className="container">
      <br />
      <h1>Tasks</h1>
      <br />
      <Form className="create form" onSubmit={event => event.preventDefault()}>
        <Stack direction="horizontal" gap={1}>
          <Form.Control type="text" placeholder="Enter description" value={description} onChange={e => setDescription(e.target.value)} />
          <Form.Control type="text" placeholder="Enter required time completion" value={totalHoursNeeded} onChange={e => setTotalHoursNeeded(e.target.value)} />
          <Form.Select type="text" placeholder="Enter status" value={status} onChange={e => setStatus(e.target.value)}>
            <option>Select status</option>
            <option value="inProgress">In progress</option>
            <option value="completed">Completed</option>
          </Form.Select>
          <Form.Control type="text" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} />
          <Button type="submit" variant="success" onClick={createTask}>Create</Button>
        </Stack>
      </Form>
      <br />
      <Table striped hover>
        <thead>
          <tr>
            <th>Description</th>
            <th>Time</th>
            <th>Status</th>
            <th>Author</th>
            <th><Button variant="info" onClick={fetchTasks}>Read</Button></th>
          </tr>
        </thead>
        <tbody key="task-table-body">
            {listElements}
        </tbody>
      </Table>
      <div className="modal show" style={{display: "block", position: "initial"}}>
        <Modal show={showModal}>
          <Modal.Header>
            <Modal.Title>Update Task</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Make changes to selected task</p>
            <Stack gap={1}>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Enter description" value={description} onChange={e => setDescription(e.target.value)} />
                <Form.Control type="text" placeholder="Enter required time completion" value={totalHoursNeeded} onChange={e => setTotalHoursNeeded(e.target.value)} />
                <Form.Select type="text" placeholder="Enter status" value={status} onChange={e => setStatus(e.target.value)}>
                  <option>Select status</option>
                  <option value="inProgress">In progress</option>
                  <option value="completed">Completed</option>
                </Form.Select>
                <Form.Control type="text" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} />
              </Form.Group>
            </Stack>
          </Modal.Body>

          <Modal.Footer>
            <Stack direction="horizontal" gap={1}>
              <Button variant="primary" onClick={(task) => updateTask(task.Id)}>Save Changes</Button>
              <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            </Stack>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default App;