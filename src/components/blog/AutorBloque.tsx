interface AutorBloqueProps {
  nombre: string;
  credencial: string;
  descripcion: string;
}

export default function AutorBloque({ nombre, credencial, descripcion }: AutorBloqueProps) {
  return (
    <div className="autor-bloque">
      <div className="autor-info">
        <p className="autor-nombre">{nombre}</p>
        <p className="autor-credencial">{credencial}</p>
        <p className="autor-descripcion">{descripcion}</p>
      </div>
    </div>
  );
}