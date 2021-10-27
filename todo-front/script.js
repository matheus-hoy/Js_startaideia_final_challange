axios
  .get("http://localhost:4000/tarefas")
  .then((response) => console.log(response))
  .catch((error) => console.log(error));
