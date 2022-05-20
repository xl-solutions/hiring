import { useState } from "react"
import Modal from 'react-modal'
import { CompareModal } from "../CompareModal";
import { HistoricModal } from "../HistoricModal";
import { ProjectModal } from "../ProjectModal";
import { RecentModal } from "../RecentModal";
import { Container  } from "./styles"

export function Stocks(){
    // Modal 1
    const [isRecentModalOpen, setIsRecentModalOpen] = useState(false);

    function handleOpenRecentModal(){
        setIsRecentModalOpen(true)
    }

    function handleCloseRecentModal(){
        setIsRecentModalOpen(false)
    }

    // Modal 2
    const [isHistoricModalOpen, setIsHistoricModalOpen] = useState(false);

    function handleOpenHistoricModal(){
        setIsHistoricModalOpen(true)
    }

    function handleCloseHistoricModal(){
        setIsHistoricModalOpen(false)
    }

    // Modal 3
    const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

    function handleOpenCompareModal(){
        setIsCompareModalOpen(true)
    }
 
    function handleCloseCompareModal(){
        setIsCompareModalOpen(false)
    }

    // Modal 4
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

    function handleOpenProjectModal(){
        setIsProjectModalOpen(true)
    }
 
    function handleCloseProjectModal(){
        setIsProjectModalOpen(false)
    }

    return (
        <Container>
            <div className="Modal1">
                <header>
                    <p>Ação Recente</p>
                </header>

                <button type="button" onClick={handleOpenRecentModal}>
                    Pesquisar
                </button>
                
                {/* Modal 1 */}
                <Modal 
                    isOpen={isRecentModalOpen} 
                    onRequestClose={handleCloseRecentModal}
                    ariaHideApp={false}
                    overlayClassName="react-modal-overlay"
                    className="react-modal-content"
                >
                    <p onClick={handleCloseRecentModal} className="react-modal-close">Fechar</p>

                <RecentModal/>

                    
                </Modal>

            </div>

            <div className="Modal2">
                <header>
                    <p>Preço Historico</p>
                </header>

                <button type="button" onClick={handleOpenHistoricModal}>
                    Pesquisar
                </button>

                {/* Modal 2 */}
                <Modal 
                    isOpen={isHistoricModalOpen} 
                    onRequestClose={handleCloseHistoricModal}
                    ariaHideApp={false}
                    overlayClassName="react-modal-overlay"
                    className="react-modal-content"
                >
                    <p onClick={handleCloseHistoricModal} className="react-modal-close">Fechar</p>

                <HistoricModal/>
                

                </Modal>

            </div>

            <div className="Modal3">
                <header>
                    <p>Compara Ações</p>
                </header>

                <button type="button" onClick={handleOpenCompareModal}>
                    Pesquisar
                </button>

                {/* Modal 3 */}
                <Modal 
                    isOpen={isCompareModalOpen} 
                    onRequestClose={handleCloseCompareModal}
                    ariaHideApp={false}
                    overlayClassName="react-modal-overlay"
                    className="react-modal-content"
                >
                    <p onClick={handleCloseCompareModal} className="react-modal-close">Fechar</p>

                <CompareModal/>

                </Modal>

            </div>

            <div className="Modal4">
                <header>
                    <p>Projeta Ganhos</p>
                </header>

                <button type="button" onClick={handleOpenProjectModal}>
                    Pesquisar
                </button>

                {/* Modal 4 */}
                <Modal 
                    isOpen={isProjectModalOpen} 
                    onRequestClose={handleCloseProjectModal}
                    ariaHideApp={false}
                    overlayClassName="react-modal-overlay"
                    className="react-modal-content"
                >
                    <p onClick={handleCloseProjectModal} className="react-modal-close">Fechar</p>

                <ProjectModal/>
                    
                </Modal>

            </div>
        </Container>

        
    )
}