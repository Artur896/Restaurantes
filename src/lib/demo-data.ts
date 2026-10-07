import type {
  Sucursal,
  Platillo,
  Evento,
  Mesa,
  EstadoMesa,
  Reservacion,
  Cliente,
  Notificacion,
} from "./types";

// Datos tomados de bistromecha.com.mx (sucursales, teléfonos, WhatsApp e Instagram
// son reales y públicos). El horario es un estimado razonable: el sitio real no lo
// publica, así que debe confirmarse directamente con el restaurante antes de usarse
// en producción. Las coordenadas son aproximadas al centro de Toluca.
export const SUCURSALES: Sucursal[] = [
  {
    id: "centro",
    nombre: "Centro Histórico",
    direccion: "Aldama Norte 102, Col. Centro",
    ciudad: "Toluca, Estado de México",
    telefono: "+52 722 490 5000",
    whatsapp: "+52 729 135 8408",
    horario: "Horario por confirmar",
    idealPara: "Celebraciones, reuniones y música en vivo",
    descriptor: "El corazón del Centro Histórico de Toluca",
    resumen: "Una experiencia vibrante para celebrar, cantar, compartir y disfrutar nuestros espectáculos en vivo.",
    lat: 19.2926,
    lng: -99.6567,
  },
  {
    id: "primero-mayo",
    nombre: "Primero de Mayo",
    direccion: "Av. Primero de Mayo 517, Barrio de Santa Clara",
    ciudad: "Toluca, Estado de México",
    telefono: "+52 722 318 4536",
    whatsapp: "+52 729 135 8408",
    horario: "Horario por confirmar",
    idealPara: "Momentos íntimos, desayunos y cenas especiales",
    descriptor: "Un espacio más íntimo para conectar",
    resumen: "Una atmósfera cercana para desayunos, comidas, cenas, reuniones y momentos especiales en pareja.",
    lat: 19.288,
    lng: -99.654,
  },
];

export const PLATILLOS: Platillo[] = [
  {
    id: "p1",
    nombre: "Pizza Margarita",
    descripcion: "Tomate, mozzarella fresca, albahaca y aceite de oliva.",
    ingredientes: ["Tomate", "Mozzarella fresca", "Albahaca", "Aceite de oliva", "Masa madre"],
    precio: 180,
    categoria: "Pizzas",
    imagen: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["Vegetariano", "Más pedido"],
    disponible: true,
    sucursalIds: ["centro", "primero-mayo"],
  },
  {
    id: "p2",
    nombre: "Pasta Alfredo",
    descripcion: "Fettuccine en salsa cremosa de parmesano con un toque de nuez moscada.",
    ingredientes: ["Fettuccine", "Crema", "Parmesano", "Mantequilla", "Nuez moscada"],
    precio: 220,
    categoria: "Pastas",
    imagen: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["Vegetariano"],
    disponible: true,
    sucursalIds: ["centro", "primero-mayo"],
  },
  {
    id: "p3",
    nombre: "Hamburguesa Mecha",
    descripcion: "Carne angus, queso gouda ahumado, cebolla caramelizada y salsa de la casa.",
    ingredientes: ["Carne angus", "Queso gouda", "Cebolla caramelizada", "Pan brioche", "Salsa Mecha"],
    precio: 240,
    categoria: "Platos fuertes",
    imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["Más pedido", "Favorito"],
    disponible: true,
    sucursalIds: ["centro", "primero-mayo"],
  },
  {
    // Nombre y descripción tomados del menú publicado en bistromecha.com.mx.
    id: "p4",
    nombre: "Strudel De Manzana c/Helado",
    descripcion: "Postre austriaco relleno de compota de manzana, azúcar y canela, servido con helado.",
    ingredientes: ["Manzana", "Canela", "Azúcar", "Pasta filo", "Helado de vainilla"],
    precio: 120,
    categoria: "Postres",
    imagen: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["Vegetariano", "Favorito"],
    disponible: true,
    sucursalIds: ["centro", "primero-mayo"],
  },
  {
    // Nombre y descripción tomados del menú publicado en bistromecha.com.mx.
    id: "p5",
    nombre: "Toast de Arrachera",
    descripcion:
      "Pan artesanal tostado con pulpa de aguacate, jugosa arrachera a la parrilla, jitomates cherry y brotes de cilantro.",
    ingredientes: ["Pan artesanal", "Aguacate", "Arrachera", "Jitomate cherry", "Cilantro"],
    precio: 165,
    categoria: "Desayunos",
    imagen: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["Más pedido"],
    disponible: true,
    sucursalIds: ["centro"],
  },
  {
    id: "p6",
    nombre: "Carpaccio de Res",
    descripcion: "Finas láminas de res, parmesano, alcaparras y arúgula con aceite de trufa.",
    ingredientes: ["Res", "Parmesano", "Alcaparras", "Arúgula", "Aceite de trufa"],
    precio: 195,
    categoria: "Entradas",
    imagen: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["Sin gluten"],
    disponible: true,
    sucursalIds: ["centro", "primero-mayo"],
  },
  {
    id: "p7",
    nombre: "Ensalada Mecha",
    descripcion: "Mezcla de hojas verdes, pera, nuez, queso de cabra y vinagreta de miel.",
    ingredientes: ["Hojas verdes", "Pera", "Nuez", "Queso de cabra", "Vinagreta de miel"],
    precio: 150,
    categoria: "Ensaladas",
    imagen: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["Vegetariano", "Sin gluten"],
    disponible: true,
    sucursalIds: ["centro", "primero-mayo"],
  },
  {
    id: "p8",
    nombre: "Pizza Tartufo",
    descripcion: "Crema de trufa, hongos silvestres, mozzarella y arúgula fresca.",
    ingredientes: ["Crema de trufa", "Hongos silvestres", "Mozzarella", "Arúgula"],
    precio: 265,
    categoria: "Pizzas",
    imagen: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["Vegetariano", "Favorito"],
    disponible: false,
    sucursalIds: ["centro", "primero-mayo"],
  },
  {
    // Nombre y descripción tomados del menú publicado en bistromecha.com.mx.
    id: "p14",
    nombre: "Pizza Higo",
    descripcion: "Pizza semidulce elaborada con higo en almíbar, jamón serrano, arúgula y reducción de balsámico.",
    ingredientes: ["Higo en almíbar", "Jamón serrano", "Mozzarella", "Arúgula", "Reducción de balsámico"],
    precio: 245,
    categoria: "Pizzas",
    imagen: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["Favorito"],
    disponible: true,
    sucursalIds: ["centro", "primero-mayo"],
  },
  {
    id: "p9",
    nombre: "Negroni Mecha",
    descripcion: "Gin, campari y vermut rojo, servido en las rocas con naranja.",
    ingredientes: ["Gin", "Campari", "Vermut rojo", "Naranja"],
    precio: 165,
    categoria: "Cócteles",
    imagen: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["Más pedido"],
    disponible: true,
    sucursalIds: ["centro", "primero-mayo"],
  },
  {
    id: "p10",
    nombre: "Espresso Martini",
    descripcion: "Vodka, licor de café y espresso recién extraído.",
    ingredientes: ["Vodka", "Licor de café", "Espresso"],
    precio: 170,
    categoria: "Cócteles",
    imagen: "https://images.unsplash.com/photo-1545438102-799c3991ffb2?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["Favorito"],
    disponible: true,
    sucursalIds: ["centro", "primero-mayo"],
  },
  {
    id: "p11",
    nombre: "Copa de Vino Tinto",
    descripcion: "Selección de la casa, cepa Cabernet Sauvignon.",
    ingredientes: ["Uva Cabernet Sauvignon"],
    precio: 140,
    categoria: "Vinos",
    imagen: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["Vegano", "Sin gluten"],
    disponible: true,
    sucursalIds: ["centro", "primero-mayo"],
  },
  {
    id: "p12",
    nombre: "Capuccino",
    descripcion: "Espresso doble con leche vaporizada y espuma sedosa.",
    ingredientes: ["Café", "Leche"],
    precio: 65,
    categoria: "Café",
    imagen: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["Vegetariano"],
    disponible: true,
    sucursalIds: ["centro", "primero-mayo"],
  },
  {
    id: "p13",
    nombre: "Limonada de Romero",
    descripcion: "Limón recién exprimido, romero fresco y un toque de miel.",
    ingredientes: ["Limón", "Romero", "Miel"],
    precio: 75,
    categoria: "Bebidas",
    imagen: "https://images.unsplash.com/photo-1523371683702-67ae9f447762?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["Vegano", "Sin gluten"],
    disponible: true,
    sucursalIds: ["centro", "primero-mayo"],
  },
  {
    // Nombre y descripción tomados del menú publicado en bistromecha.com.mx.
    id: "p15",
    nombre: "Copa Clericot",
    descripcion: "Nuestro delicioso clericot servido con frutos rojos.",
    ingredientes: ["Vino tinto", "Frutos rojos", "Brandy", "Jugo de naranja"],
    precio: 140,
    categoria: "Cócteles",
    imagen: "https://images.unsplash.com/photo-1609951651556-5334e2706168?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["Favorito"],
    disponible: true,
    sucursalIds: ["centro", "primero-mayo"],
  },
];

const hoy = new Date();
function diasDesdeHoy(n: number) {
  const d = new Date(hoy);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

export const EVENTOS: Evento[] = [
  {
    id: "e1",
    nombre: "Viernes de Jazz",
    fecha: diasDesdeHoy(0),
    hora: "20:30",
    horaFin: "23:30",
    descripcion: "Una noche para disfrutar buena música, cocina y cócteles de autor.",
    artista: "Live Session",
    imagen: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1600&auto=format&fit=crop",
    tipo: "Jazz",
    sucursalId: "centro",
    capacidad: 80,
    confirmados: 32,
    estado: "Publicado",
  },
  {
    id: "e2",
    nombre: "Live Session Acústico",
    fecha: diasDesdeHoy(1),
    hora: "21:00",
    horaFin: "23:00",
    descripcion: "Sesión acústica con artistas invitados en un ambiente íntimo.",
    artista: "Dúo Cálido",
    imagen: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=1600&auto=format&fit=crop",
    tipo: "Acústico",
    sucursalId: "centro",
    capacidad: 60,
    confirmados: 18,
    estado: "Publicado",
  },
  {
    id: "e3",
    nombre: "Brunch & Music",
    fecha: diasDesdeHoy(2),
    hora: "11:00",
    horaFin: "14:00",
    descripcion: "Brunch dominical con música en vivo y mimosas de cortesía.",
    artista: "DJ Mañanero",
    imagen: "https://images.unsplash.com/photo-1533777324565-a040eb52facd?q=80&w=1600&auto=format&fit=crop",
    tipo: "Brunch",
    sucursalId: "primero-mayo",
    capacidad: 50,
    confirmados: 41,
    estado: "Publicado",
  },
  {
    id: "e4",
    nombre: "Noche de DJ",
    fecha: diasDesdeHoy(6),
    hora: "22:00",
    horaFin: "02:00",
    descripcion: "Sets house y disco para cerrar la semana por todo lo alto.",
    artista: "DJ Mecha",
    imagen: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1600&auto=format&fit=crop",
    tipo: "DJ",
    sucursalId: "centro",
    capacidad: 100,
    confirmados: 12,
    estado: "Programado",
  },
];

export const MESAS: Mesa[] = [
  { id: "m1", numero: 1, zona: "Salón", capacidad: 2, estado: "Disponible", sucursalId: "centro", x: 12, y: 20 },
  { id: "m2", numero: 2, zona: "Salón", capacidad: 4, estado: "Ocupada", sucursalId: "centro", x: 28, y: 20, clienteActual: "Juan Pérez", horaOcupacion: "20:00", cuentaTotal: 850 },
  { id: "m3", numero: 3, zona: "Salón", capacidad: 4, estado: "Reservada", sucursalId: "centro", x: 44, y: 20 },
  { id: "m4", numero: 4, zona: "Salón", capacidad: 2, estado: "Por limpiar", sucursalId: "centro", x: 60, y: 20 },
  { id: "m5", numero: 5, zona: "Salón", capacidad: 6, estado: "Disponible", sucursalId: "centro", x: 76, y: 20 },
  { id: "m6", numero: 6, zona: "Terraza", capacidad: 4, estado: "Ocupada", sucursalId: "centro", x: 12, y: 45, clienteActual: "Marcela Ruiz", horaOcupacion: "19:15", cuentaTotal: 1240 },
  { id: "m7", numero: 7, zona: "Terraza", capacidad: 2, estado: "Disponible", sucursalId: "centro", x: 28, y: 45 },
  { id: "m8", numero: 8, zona: "Terraza", capacidad: 4, estado: "Bloqueada", sucursalId: "centro", x: 44, y: 45 },
  { id: "m9", numero: 9, zona: "Jardín", capacidad: 6, estado: "Disponible", sucursalId: "centro", x: 60, y: 45 },
  { id: "m10", numero: 10, zona: "Jardín", capacidad: 2, estado: "Reservada", sucursalId: "centro", x: 76, y: 45 },
  { id: "m11", numero: 11, zona: "Cerca del escenario", capacidad: 4, estado: "Disponible", sucursalId: "centro", x: 20, y: 70 },
  { id: "m12", numero: 12, zona: "Cerca del escenario", capacidad: 4, estado: "Ocupada", sucursalId: "centro", x: 36, y: 70, clienteActual: "Equipo Mesa 12", horaOcupacion: "20:10", cuentaTotal: 560 },
  { id: "m13", numero: 13, zona: "Zona preferente", capacidad: 2, estado: "Disponible", sucursalId: "centro", x: 52, y: 70 },
  { id: "m14", numero: 14, zona: "Zona preferente", capacidad: 4, estado: "Ocupada", sucursalId: "centro", x: 68, y: 70, clienteActual: "Juan Pérez", horaOcupacion: "20:00", cuentaTotal: 850 },
];

export const RESERVACIONES: Reservacion[] = [
  {
    id: "r1",
    nombre: "Carlos Ibarra",
    telefono: "722 111 2233",
    correo: "carlos@example.com",
    fecha: diasDesdeHoy(0),
    hora: "20:30",
    personas: 4,
    ocasion: "Cena con amigos",
    zona: "Cerca del escenario",
    comentarios: "Les gustaría estar cerca del escenario, van al evento de jazz.",
    sucursalId: "centro",
    estado: "Confirmada",
    eventoId: "e1",
    codigo: "BM-48213",
  },
  {
    id: "r2",
    nombre: "Ana Valdés",
    telefono: "722 444 5566",
    correo: "ana@example.com",
    fecha: diasDesdeHoy(0),
    hora: "19:00",
    personas: 2,
    ocasion: "Cena romántica",
    zona: "Terraza",
    sucursalId: "centro",
    estado: "En mesa",
    mesaId: "m6",
    codigo: "BM-48109",
  },
  {
    id: "r3",
    nombre: "Familia Torres",
    telefono: "722 777 8899",
    correo: "torres@example.com",
    fecha: diasDesdeHoy(1),
    hora: "14:00",
    personas: 6,
    ocasion: "Reunión familiar",
    zona: "Jardín",
    sucursalId: "centro",
    estado: "Pendiente",
    codigo: "BM-48320",
  },
  {
    id: "r4",
    nombre: "Luis Hernández",
    telefono: "722 222 3344",
    correo: "luis@example.com",
    fecha: diasDesdeHoy(-1),
    hora: "21:00",
    personas: 3,
    ocasion: "Negocios",
    zona: "Salón",
    sucursalId: "centro",
    estado: "Finalizada",
    codigo: "BM-47990",
  },
];

export const CLIENTES: Cliente[] = [
  {
    id: "c1",
    nombre: "Arturo de la Cruz",
    telefono: "722 555 0199",
    correo: "delacruzarturo896@gmail.com",
    visitas: 12,
    favoritos: ["p3", "p9", "p4"],
    reservaciones: ["r1"],
  },
  {
    id: "c2",
    nombre: "Ana Valdés",
    telefono: "722 444 5566",
    correo: "ana@example.com",
    visitas: 5,
    favoritos: ["p1", "p10"],
    reservaciones: ["r2"],
  },
  {
    id: "c3",
    nombre: "Familia Torres",
    telefono: "722 777 8899",
    correo: "torres@example.com",
    visitas: 2,
    favoritos: ["p7"],
    reservaciones: ["r3"],
  },
];

export const NOTIFICACIONES: Notificacion[] = [
  { id: "n1", tipo: "Nueva reservación", titulo: "Nueva reserva", mensaje: "Carlos reservó una mesa para 4 personas a las 20:30.", hora: "hace 4 min", leida: false },
  { id: "n2", tipo: "Nueva solicitud de mesero", titulo: "Mesa 14 solicita ayuda", mensaje: "Juan Pérez pidió llamar al mesero.", hora: "hace 6 min", leida: false },
  { id: "n3", tipo: "Nueva cuenta solicitada", titulo: "Mesa 6 solicitó la cuenta", mensaje: "Marcela Ruiz solicitó su cuenta.", hora: "hace 15 min", leida: false },
  { id: "n4", tipo: "Nuevo pedido", titulo: "Nuevo pedido en Mesa 12", mensaje: "Se agregó 1 Tiramisú a la cuenta.", hora: "hace 22 min", leida: true },
  { id: "n5", tipo: "Evento próximo", titulo: "Viernes de Jazz en 2 horas", mensaje: "32/80 lugares confirmados para esta noche.", hora: "hace 1 h", leida: true },
  { id: "n6", tipo: "Mesa ocupada", titulo: "Mesa 2 ocupada", mensaje: "Mesa 2 fue marcada como ocupada.", hora: "hace 2 h", leida: true },
];

export const VENTAS_SEMANA = [
  { dia: "Lun", ventas: 18500, reservaciones: 22 },
  { dia: "Mar", ventas: 16200, reservaciones: 19 },
  { dia: "Mié", ventas: 21300, reservaciones: 26 },
  { dia: "Jue", ventas: 24800, reservaciones: 29 },
  { dia: "Vie", ventas: 38750, reservaciones: 48 },
  { dia: "Sáb", ventas: 42100, reservaciones: 55 },
  { dia: "Dom", ventas: 27600, reservaciones: 33 },
];

export const PLATILLOS_MAS_VENDIDOS = [
  { nombre: "Pizza Margarita", cantidad: 142 },
  { nombre: "Hamburguesa Mecha", cantidad: 118 },
  { nombre: "Negroni Mecha", cantidad: 97 },
  { nombre: "Pasta Alfredo", cantidad: 84 },
  { nombre: "Tiramisú", cantidad: 76 },
];

export const OCUPACION_HORARIO = [
  { hora: "13:00", ocupacion: 35 },
  { hora: "14:00", ocupacion: 58 },
  { hora: "15:00", ocupacion: 40 },
  { hora: "19:00", ocupacion: 62 },
  { hora: "20:00", ocupacion: 88 },
  { hora: "21:00", ocupacion: 95 },
  { hora: "22:00", ocupacion: 70 },
];

export const HORARIOS_RESERVA = [
  { hora: "18:00", estado: "Disponible" as const },
  { hora: "18:30", estado: "Disponible" as const },
  { hora: "19:00", estado: "Pocas mesas" as const },
  { hora: "19:30", estado: "Disponible" as const },
  { hora: "20:00", estado: "Pocas mesas" as const },
  { hora: "20:30", estado: "No disponible" as const },
  { hora: "21:00", estado: "Disponible" as const },
];

/**
 * Bloques de reservación de 2 horas. Cada reservación ocupa una mesa durante
 * todo el bloque; al terminar, la mesa vuelve a estar disponible para el
 * siguiente bloque (ver sección 6 del brief: disponibilidad = fecha + horario).
 */
export const BLOQUES_HORARIO: { inicio: string; fin: string }[] = [
  { inicio: "13:00", fin: "15:00" },
  { inicio: "15:00", fin: "17:00" },
  { inicio: "17:00", fin: "19:00" },
  { inicio: "19:00", fin: "21:00" },
  { inicio: "21:00", fin: "23:00" },
];

function horaAMinutos(hora: string) {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

/** Bloque de 2h al que pertenece una hora puntual, p. ej. una reservación existente a las 19:30. */
export function bloqueDeHora(hora: string) {
  const minutos = horaAMinutos(hora);
  return BLOQUES_HORARIO.find((b) => minutos >= horaAMinutos(b.inicio) && minutos < horaAMinutos(b.fin));
}

/**
 * Disponibilidad real de una mesa para una fecha + bloque de horario dados.
 * "Bloqueada" es un estado permanente (mesa fuera de servicio); todo lo demás
 * depende de si existe una reservación activa que se traslape con ese bloque.
 */
export function disponibilidadMesa(
  mesa: Mesa,
  fecha: string,
  bloque: { inicio: string; fin: string }
): EstadoMesa {
  if (mesa.estado === "Bloqueada") return "Bloqueada";
  const reservadaEnBloque = RESERVACIONES.some(
    (r) =>
      r.mesaId === mesa.id &&
      r.fecha === fecha &&
      r.estado !== "Cancelada" &&
      r.estado !== "Finalizada" &&
      bloqueDeHora(r.hora)?.inicio === bloque.inicio
  );
  if (reservadaEnBloque) return "Reservada";
  return "Disponible";
}

export function eventoDeHoy(sucursalId?: string) {
  const fechaHoy = diasDesdeHoy(0);
  return EVENTOS.find(
    (e) => e.fecha === fechaHoy && e.estado === "Publicado" && (!sucursalId || e.sucursalId === sucursalId)
  );
}

export function proximosEventos(excludeId?: string) {
  return EVENTOS.filter((e) => e.id !== excludeId && e.estado !== "Borrador").slice(0, 4);
}

export function formatCurrency(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
}
