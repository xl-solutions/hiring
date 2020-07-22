import styled from "styled-components";


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #eee;
  padding: 5vh
`;

export const Header = styled.div`

flex:0.5;
flex-direction: column;
width: 100%;
display: flex;
background-color: rgb(33,150,243,0.3);
padding: 2vh 5vh 2vh 5vh;
border-top: 10px  solid #2196F3;




.top-header{
    flex:1;
    display: flex;
    width: 100%;
    .value-div{
        flex:1;
        display: flex;
        .cipher {
            flex:0.06;
            color: Black;
            font-size: 20px;
            margin: 18px 0 0 0
        }
        .main-value {
            flex:1;
            padding: 0px 0 0px 10px;
            color: Black;
            font-size: 40px;
            font-weight: bold;
        }
        .main-pricedAt {
            flex:1;
            color: Black;
            font-size: 15px;
            text-align: center;
            padding: 4px 0 0 0;
        }
        .main-stock-name {
            overflow: hidden;
            flex:1;
            color: Black;
            font-size: 30px;
            font-weight: bold;
            text-align: center
        }
    }
    .search-div{
        flex:1;
        flex-direction: column;
        display:flex;
        align-items: center;
        justify-content:  flex-start;
        p{
            color: red;
            font-size: 15px;
            font-weight: bold;
        }
        
    }
   
};
.bottom-header{
    flex:0.5;
    display:flex;
   
    button{
        width: 100%;
         color: #fff;
         height: 80%;
         background: rgb(33,150,243);
        
         border: 0;
         border-radius: 0px;
         cursor: pointer;
         font-size: 15px;
         
         opacity: 1;
         transition: opacity 300ms ease;
     }
    
}
`;




export const ValueInfos = styled.div`

    flex:0.8;
    width: 100%;

    display:flex;
    flex-direction: row;

    .chartDiv{
        flex:1;
        
    }
    .infosDiv{
        flex:0.4;
        background-color: rgb(33,150,243,0.3);
        border-top: 10px  solid #2196F3;

        div{
            width: 100%;
            height: 100%;
            text-align: center;

            p{
                font-size: 12px
            }
        }   


    }
`;

export const Item = styled.div`
display:flex;
flex-direction: column;
width: 18%;
height: 100%;
margin: 0 10px 0 10px;


justify-content:center;
align-items: center;

input{
    text-align: center;
    
}


`;

export const Search = styled.div`

 
    display: flex;
    width: 300px;
    height: 50px;
    
    input{
        width: 70%;
        height: 50px;
     

        padding: 10px 0 10px 15px;
        margin: 0;
        font-weight: 400;
        color: #377D6A;
        background: #efefef;
        border: 0;
        // text-indent: 45px; // Arbitrary.
    }
    button{
       width: 30%;
        color: #fff;
        height: 50px;
        background: rgb(33,150,243);
        
        
        border: 0;
        border-radius: 0px;
        cursor: pointer;
        font-size: 15px;
        
        opacity: 1;
        transition: opacity 300ms ease;
    }
`;

export const GainsInfos = styled.div`
    flex:0.6;
    width: 100%;

    display: flex;
    flex-direction: column;

    .title-gains{
        flex: 0.2;
        background-color: #2196F3;
        padding: 10px 0 0 25px;
     

    }

    .body-gains{
        flex:1;
        background-color: rgb(33,150,243,0.3);
        flex-direction: row;
        display: flex;
        div{
            display:flex;
            flex-direction: column;
            width:20%;
            height: 80%;
            margin: 10px 10px 0 10px;
    
            // background-color:green;
            justify-content: flex-start;
            align-items: center;
        }

        .purchasedAmount{
            text-align: center
        }

        input{
            height: 25%;
            width: 80%;
        }

        .divButtonResult{
      
            align-items: center;
            justify-content:  center;
            button{
                width: 30%;
                height: 20%;
                color: #fff;
                height: 50px;
                background: rgb(33,150,243);
                
                
                border: 0;
                border-radius: 0px;
                cursor: pointer;
                font-size: 15px;
                
                opacity: 1;
                transition: opacity 300ms ease;
            }

            .divErrorGains{

                p{
                    color: red;
                    font-size: 12px;
                    text-align: center;

                }
            }

        }

        .divResult{

            p{
              
            }

            p::nth-letter(in){
                font-weight: bold;
            }
        }

    }


   

`;

