export type Sucursal = {
  id: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  telefono: string;
  whatsapp: string;
  horario: string;
  lat: number;
  lng: number;
  /** Frase corta tipo "El corazón del Centro Histórico de Toluca". */
  descriptor?: string;
  /** Párrafo breve describiendo la experiencia de esa sucursal. */
  resumen?: string;
  /** Para qué tipo de visita es ideal, p. ej. "Celebraciones, reuniones y música en vivo". */
  idealPara?: string;
};

export type CategoriaMenu =
  | "Desayunos"
  | "Entradas"
  | "Ensaladas"
  | "Pastas"
  | "Pizzas"
  | "Platos fuertes"
  | "Postres"
  | "Café"
  | "Cócteles"
  | "Vinos"
  | "Bebidas";

export type Etiqueta = "Vegetariano" | "Vegano" | "Sin gluten" | "Favorito" | "Más pedido";

export type Platillo = {
  id: string;
  nombre: string;
  descripcion: string;
  ingredientes: string[];
  precio: number;
  categoria: CategoriaMenu;
  imagen: string;
  etiquetas: Etiqueta[];
  disponible: boolean;
  sucursalIds: string[];
};

export type TipoEvento =
  | "Música en vivo"
  | "Jazz"
  | "DJ"
  | "Rock"
  | "Acústico"
  | "Brunch"
  | "Evento especial"
  | "Transmisión deportiva"
  | "Otro";

export type EstadoEvento = "Publicado" | "Borrador" | "Programado";

export type Evento = {
  id: string;
  nombre: string;
  fecha: string; // ISO date
  hora: string;
  horaFin: string;
  descripcion: string;
  artista: string;
  imagen: string;
  tipo: TipoEvento;
  sucursalId: string;
  capacidad: number;
  confirmados: number;
  estado: EstadoEvento;
};

export type EstadoMesa = "Disponible" | "Reservada" | "Ocupada" | "Por limpiar" | "Bloqueada";

export type Zona = "Salón" | "Terraza" | "Jardín" | "Zona preferente" | "Cerca del escenario" | "Sin preferencia";

export type Mesa = {
  id: string;
  numero: number;
  zona: Zona;
  capacidad: number;
  estado: EstadoMesa;
  sucursalId: string;
  x: number; // posicion en mapa (porcentaje)
  y: number;
  clienteActual?: string;
  horaOcupacion?: string;
  cuentaTotal?: number;
};

export type Ocasion =
  | "Cumpleaños"
  | "Aniversario"
  | "Cena romántica"
  | "Reunión familiar"
  | "Cena con amigos"
  | "Negocios"
  | "Otra";

export type EstadoReservacion = "Confirmada" | "Pendiente" | "En mesa" | "Finalizada" | "Cancelada";

export type Reservacion = {
  id: string;
  nombre: string;
  telefono: string;
  correo: string;
  fecha: string;
  hora: string;
  personas: number;
  ocasion: Ocasion;
  zona: Zona;
  comentarios?: string;
  sucursalId: string;
  estado: EstadoReservacion;
  mesaId?: string;
  eventoId?: string;
  codigo: string;
};

export type Cliente = {
  id: string;
  nombre: string;
  telefono: string;
  correo: string;
  visitas: number;
  favoritos: string[]; // ids de platillos
  reservaciones: string[]; // ids
};

export type ItemCuenta = {
  platilloId: string;
  nombre: string;
  precio: number;
  cantidad: number;
};

export type Cuenta = {
  mesaId: string;
  items: ItemCuenta[];
  propinaPorcentaje: number | null;
  propinaManual?: number;
};

export type TipoNotificacion =
  | "Nueva reservación"
  | "Nueva solicitud de mesero"
  | "Nueva cuenta solicitada"
  | "Nuevo pedido"
  | "Evento próximo"
  | "Mesa ocupada";

export type Notificacion = {
  id: string;
  tipo: TipoNotificacion;
  titulo: string;
  mensaje: string;
  hora: string;
  leida: boolean;
};

export type Rol = "Administrador" | "Gerente" | "Mesero" | "Cocina" | "Cliente";
