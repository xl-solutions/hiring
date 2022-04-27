import psycopg2


def valid_database() -> bool:
    is_valid = True
    con = None
    try:
        con = psycopg2.connect(
            host='localhost',
            database='postgres',
            user='postgres',
            password='2208'
        )
    except:
        pass
    if not con:
        is_valid = False
    
    return is_valid

def validate_database() -> object:
    is_valid = True
    con = None
    try:
        con = psycopg2.connect(
            host='localhost',
            database='postgres',
            user='postgres',
            password='2208'
        )
    except:
        pass
    
    if con:
        cur = con.cursor()

        try:
            sql = '''CREATE TABLE IF NOT EXISTS
                    public.telefones (id serial primary key, manufacturer varchar(50),
                    model varchar(50), color varchar(25),
                    carrier_plan_type varchar(5), quantity int, price float )'''
            cur.execute(sql)
            con.commit()
            
            client = {
                'con': con,
                'cur': cur
            }
        except:
            client = {}

    
    return client

def create_data(data) -> bool: # is_ok [True: ok, 1: erro de conexao, 2: falha ao criar ou encontra tabela, 3: falha ao inserir itens]
    is_ok = True
    client = validate_database()
    cur = client.get('cur')
    con = client.get('con')
    is_valid = client.get('is_valid')
    print(client)
    try:
        if is_valid:
            for d in data:
                sql = f"""INSERT INTO
                        telefones values (default, '{d.get("manufacturer")}',
                        '{d.get("model")}', '{d.get("color")}', '{d.get("carrier_plan_type")}',
                        '{d.get("quantity")}', '{d.get("price")}')"""
                
                cur.execute(sql)
                con.commit()
            
            con.close()
        else:
            is_ok = False
            print("Banco de dados nao validado")
    except:
        is_ok = False
    
    return is_ok

def get_data() -> list:
    client = validate_database()
    cur = client.get('cur')
    con = client.get('con')
    is_valid = client.get('is_valid')
    rows = []
    
    if is_valid:
        sql = 'SELECT * FROM public.telefones'
        cur.execute(sql)
        rows = cur.fetchall()
        con.close()
        
    else:
        print("erro")

    return rows

def get_filter_data() -> dict:

    client = validate_database()
    cur = client.get('cur')
    con = client.get('con')
    is_valid = client.get('is_valid')
    filter_data = {}
    
    if is_valid:
        # manufacturer
        sql = 'SELECT DISTINCT manufacturer FROM public.telefones '
        cur.execute(sql)
        manufacturer = cur.fetchall()
        
        print(manufacturer)
        
        # carrier_plan_type
        sql = 'SELECT DISTINCT carrier_plan_type FROM public.telefones '
        cur.execute(sql)
        plan = cur.fetchall()
        
        print(plan)
        
        # model
        sql = 'SELECT DISTINCT model FROM public.telefones '
        cur.execute(sql)
        model = cur.fetchall()
        
        print(model)
    
        filter_data = {
            "manufacturer": manufacturer,
            "model": model,
            "plan": plan
        }
        con.close()
    
    return filter_data