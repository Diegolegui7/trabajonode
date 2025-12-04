const express = require("express");
const app = express();
app.use(express.json());

let usuarios = [
  { id: 1, nombre: "Diego" },
  { id: 2, nombre: "Juan" },
  { id: 3, nombre: "Maria" }
];

app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

app.get("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = usuarios.find(u => u.id === id);
  if (!user) return res.status(404).json({ mensaje: "Usuario no encontrado" });
  res.json(user);
});

app.post("/usuarios", (req, res) => {
  const { nombre } = req.body;
  if (!nombre) return res.status(400).json({ mensaje: "Nombre obligatorio" });
  const nuevo = { id: usuarios.length + 1, nombre };
  usuarios.push(nuevo);
  res.status(201).json(nuevo);
});

app.delete("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const existe = usuarios.some(u => u.id === id);
  if (!existe) return res.status(404).json({ mensaje: "Usuario no encontrado" });
  usuarios = usuarios.filter(u => u.id !== id);
  res.json({ mensaje: "usuario eliminado" });
});

app.put("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre } = req.body;
  const user = usuarios.find(u => u.id === id);
  if (!user) return res.status(404).json({ mensaje: "Usuario no encontrado" });
  if (!nombre) return res.status(400).json({ mensaje: "Nombre obligatorio" });
  user.nombre = nombre;
  res.json(user);
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
