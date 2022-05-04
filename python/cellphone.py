from dataclasses import dataclass

@dataclass
class Cellphone:
    manufacturer: str
    model: str
    color: str
    carrier_plan_type: str
    quantity: int
    price: int


    