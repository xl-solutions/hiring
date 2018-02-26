CREATE TABLE [dbo].[tb_produtos](
	[pro_id] [int] IDENTITY(1,1) NOT NULL,
	[pro_nome] [varchar](200) NULL,
	[pro_valor] [decimal](9, 2) NULL,
	[pro_quantidade] [int] NULL,
	[pro_unidade] [varchar](100) NULL,
	[pro_marca] [int] NULL,
	[pro_cor] [varchar](50) NULL,
	[pro_tipo_plano] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[pro_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]




CREATE TABLE [dbo].[tb_marcas](
	[id_marca] [int] IDENTITY(1,1) NOT NULL,
	[nome_marca] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_marca] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



CREATE TABLE [dbo].[tb_importacao](
	[imp_id] [int] IDENTITY(1,1) NOT NULL,
	[imp_arquivo] [varchar](500) NULL,
	[imp_data_inicio] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[imp_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]