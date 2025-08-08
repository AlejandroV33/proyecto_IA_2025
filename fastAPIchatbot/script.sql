-- Tabla: Compras
CREATE TABLE Compras (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Fecha TEXT NOT NULL, -- formato: 'DD/MM/YYYY'
    Proveedor TEXT NOT NULL,
    Monto REAL NOT NULL
);

-- Tabla: Ventas
CREATE TABLE Ventas (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Fecha TEXT NOT NULL, -- formato: 'DD/MM/YYYY'
    Cliente TEXT,
    RUC_Cedula TEXT,
    BaseImponible REAL,
    MontoIVA REAL,
    NoGravaIVA REAL,
    MontoTotal REAL,
);

-- Tabla: Inventario
CREATE TABLE Inventario (
    Codigo TEXT PRIMARY KEY,
    Descripcion TEXT,
    Existencia REAL,
    CostoUnitario REAL,
    Valoracion REAL,
    PrecioVenta REAL,
    ValorDeVenta REAL,
    ValorConIVA REAL,
    IVAValoracion REAL
);

-- Tabla: Movimientos de Productos
CREATE TABLE MovimientosProductos (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Codigo TEXT NOT NULL,
    Fecha TEXT NOT NULL, -- formato: 'DD/MM/YYYY'
    TipoMovimiento TEXT,
    Entradas REAL DEFAULT 0.0,
    Salidas REAL DEFAULT 0.0,
    FOREIGN KEY (Codigo) REFERENCES Inventario (Codigo)
);
