function mostrarSeccion(id) {
  document.querySelectorAll(".seccion").forEach(sec => sec.classList.remove("visible"));
  document.getElementById(id).classList.add("visible");
}
