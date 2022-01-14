import React, {useState} from 'react';
import {ListItem, Tooltip, Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import DescriptionIcon from '@material-ui/icons/Description';
import { useHistory } from 'react-router-dom';
import ListAltIcon from '@material-ui/icons/ListAlt';
import FaceIcon from '@material-ui/icons/Face';
import EventIcon from '@material-ui/icons/Event';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { useSelector } from 'react-redux';
import * as constants from '../../utils/constants';

type MenuProp = {
  open: Boolean
}

export const MainListItems: React.FC<MenuProp> = ({open}: MenuProp) => {
  const menuSelecionado = useSelector((state: any) => state.menu.active);
  const backgroundMenuAtivo = '#B0C4DE';
  // const dispatch = useDispatch();
  const history = useHistory();
  const [accordioOpen, setAccordionOpen] = useState('');

  const handleChangeMenu = (rota: string): any => {
    history.push(rota);
  };

  return (
    <div>
      <Tooltip title={ open? '' : 'Ações'} placement="right" arrow>
        <ListItem
          button
          style={{
            background:
              menuSelecionado === constants.MENU_STOCK
                ? backgroundMenuAtivo
                : 'white',
            color:
              menuSelecionado === constants.MENU_STOCK ? 'white' : 'black',
          }}
          onClick={() => handleChangeMenu('/stock')}
        >
          <ListItemIcon>
            <FaceIcon
              style={{
                color:
                  menuSelecionado === constants.MENU_STOCK
                    ? 'white'
                    : 'rgba(0, 0, 0, 0.54)',
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Busca unitaria" />
        </ListItem>
      </Tooltip>
      <Tooltip title={ open? '' : 'Historico'} placement="right" arrow>
        <ListItem
          button
          style={{
            background:
              menuSelecionado === constants.MENU_HISTORICO
                ? backgroundMenuAtivo
                : 'white',
            color:
              menuSelecionado === constants.MENU_HISTORICO ? 'white' : 'black',
          }}
          onClick={() => handleChangeMenu('/historico')}
        >
          <ListItemIcon>
            <PeopleIcon
              style={{
                color:
                  menuSelecionado === constants.MENU_HISTORICO
                    ? 'white'
                    : 'rgba(0, 0, 0, 0.54)',
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Historico" />
        </ListItem>
      </Tooltip>
      <Tooltip title={ open? '' : 'Comparação'} placement="right" arrow>
        <ListItem
          button
          style={{
            background:
              menuSelecionado === constants.MENU_COMPARACAO
                ? backgroundMenuAtivo
                : 'white',
            color:
              menuSelecionado === constants.MENU_COMPARACAO ? 'white' : 'black',
          }}
          onClick={() => handleChangeMenu('/comparacao')}
        >
          <ListItemIcon>
            <MonetizationOnIcon
              style={{
                color:
                  menuSelecionado === constants.MENU_COMPARACAO
                    ? 'white'
                    : 'rgba(0, 0, 0, 0.54)',
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Comparação" />
        </ListItem>
      </Tooltip>


      <Tooltip title={ open? '' : 'Projeção'} placement="right" arrow>
        <ListItem
          button
          style={{
            background:
              menuSelecionado === constants.MENU_PROJECAO
                ? backgroundMenuAtivo
                : 'white',
            color:
              menuSelecionado === constants.MENU_PROJECAO ? 'white' : 'black',
          }}
          onClick={() => handleChangeMenu('/projecao')}
        >
          <ListItemIcon>
            <LibraryBooksIcon
              style={{
                color:
                  menuSelecionado === constants.MENU_PROJECAO
                    ? 'white'
                    : 'rgba(0, 0, 0, 0.54)',
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Projeção" />
        </ListItem>
      </Tooltip>
        {/* <Accordion
          expanded={menuSelecionado === constants.MENU_DOCUMENTOS_WORD ||
            menuSelecionado === constants.MENU_DOCUMENTOS_PDF ||
            accordioOpen === constants.MENU_DOCUMENTOS} onClick={() => setAccordionOpen(accordioOpen === constants.MENU_DOCUMENTOS ? '' : constants.MENU_DOCUMENTOS)}
        >
            <AccordionSummary
              style={{padding: '0px', height: '50px', display: 'inline-flex'}}
              expandIcon={<ExpandMoreIcon />}
            >
              <ListItem>
                <Tooltip title={ open? '' : 'Documentos'} placement="right" arrow>
                <ListItemIcon>
                  <LibraryBooksIcon
                    style={{color:'rgba(0, 0, 0, 0.54)'}}
                  />
                </ListItemIcon>
              </Tooltip>
                <ListItemText primary="Documentos" />
              </ListItem>
            </AccordionSummary>
          <AccordionDetails style={{padding: '0px', display: 'flex', flexDirection: 'column'}}>
            <Tooltip title={ open? '' : 'Documentos Word'} placement="right" arrow>
              <ListItem
                button
                style={{
                  background:
                    menuSelecionado === constants.MENU_DOCUMENTOS_WORD
                      ? backgroundMenuAtivo
                      : 'white',
                  color:
                    menuSelecionado === constants.MENU_DOCUMENTOS_WORD ? 'white' : 'black',
                }}
                onClick={() => handleChangeMenu('/documentos-word')}
              >
                <ListItemIcon>
                  <InsertDriveFileIcon
                    style={{
                      color:
                        menuSelecionado === constants.MENU_DOCUMENTOS_WORD
                          ? 'white'
                          : 'rgba(0, 0, 0, 0.54)',
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="Word"/>
              </ListItem>
            </Tooltip>
            <Tooltip title={ open? '' : 'Documentos PDF'} placement="right" arrow>
              <ListItem
                button
                style={{
                  background:
                    menuSelecionado === constants.MENU_DOCUMENTOS_PDF
                      ? backgroundMenuAtivo
                      : 'white',
                  color:
                    menuSelecionado === constants.MENU_DOCUMENTOS_PDF ? 'white' : 'black',
                }}
                onClick={() => handleChangeMenu('/documentos-pdf')}
              >
                <ListItemIcon>
                  <PictureAsPdfIcon
                    style={{
                      color:
                        menuSelecionado === constants.MENU_DOCUMENTOS_PDF
                          ? 'white'
                          : 'rgba(0, 0, 0, 0.54)',
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="PDF" />
              </ListItem>
            </Tooltip>
          </AccordionDetails>
        </Accordion> */}
    </div>
  );
};
