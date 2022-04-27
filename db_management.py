import psycopg2

def validate_database() -> bool:
    is_valid = True

    try:
        con = psycopg2.connect(
            host='localhost',
            database='postgres',
            user='postgres',
            password='2208'
        )
        cur = con.cursor()

    except Exception as e:
        is_valid = False
        print(f"Não conectado {e}")

    try:
        sql = '''CREATE TABLE IF NOT EXISTS
                public.telefones (id serial primary key, manufacturer varchar(50),
                model varchar(50), color varchar(25),
                carrier_plan_type varchar(5), quantity int, price float )'''
        cur.execute(sql)
        con.commit()
    except Exception as e:
        is_valid = False
        print(e)
    
    if is_valid:
        client = {
            'is_valid': is_valid,
            'con': con,
            'cur': cur
        }
    else:
        client = {
            'is_valid': is_valid
        }
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
    is_ok = True
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
        is_ok = False
        print("erro")

    df = {
        'is_ok': is_ok,
        'rows': rows
    }
    return rows

def get_filter_data() -> dict:
    is_ok = True
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