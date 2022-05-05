import { FC, HTMLAttributes } from "react";
import { ModalContainer, Overlay } from "./styles";

interface DivProps extends HTMLAttributes<DivProps>{
    children: any,
    handleClose: any
}

export const PhotoView: FC<DivProps> =({children, handleClose }: DivProps) => {
    return (
      <Overlay>
        <ModalContainer>
            <header>
                <span onClick={handleClose}>&times;</span>
            </header>
            <div>
                {children}
            </div>
        </ModalContainer>
      </Overlay>
    );
  }
  export default PhotoView;