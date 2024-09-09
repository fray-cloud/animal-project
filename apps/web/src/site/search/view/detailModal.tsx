import DetailView from './detailTable';
import { AbandonmentPublic } from '../../../api/callAPI';

import { Box, Modal, ModalClose, ModalDialog } from '@mui/joy';

const DetailModalView = (props: {
  isShow: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  data?: AbandonmentPublic | undefined;
}) => {
  const handleClose = () => props.setShow(false);

  return (
    <Modal open={props.isShow} onClose={handleClose}>
      <ModalDialog>
        <ModalClose />
        <Box
          sx={{
            // width : "80%",
            // height : "80%",
            overflow: 'scroll',
          }}
        >
          <DetailView data={props.data}></DetailView>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default DetailModalView;
