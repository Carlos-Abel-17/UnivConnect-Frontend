function Inicio() {
  return (
    <div className="flex w-full min-h-screen bg-black text-white p-4 gap-4">
      
      {/* Primera caja: Noticias */}
      <div className="flex-1 border-2 border-gray-800 rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-2">Últimas Noticias</h2>
        <p>Aquí aparecerán todas las publicaciones o noticias relevantes.</p>
      </div>

      {/* Segunda caja: Notificaciones o Chat */}
      <div className="w-[300px] h-[35vh] border-2 border-gray-800 rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-2">Notificaciones</h2>
        <p>Avisos importantes o mensajes destacados.</p>
      </div>

    </div>
  );
}

export default Inicio;
