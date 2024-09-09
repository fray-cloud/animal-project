import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';

const AbandonmentInfomation = () => {
  return (
    <Stepper
      orientation="vertical"
      sx={{
        marginLeft: '20px',
      }}
    >
      <Typography>입양 절차</Typography>
      <Step indicator={<StepIndicator>1</StepIndicator>}>
        <Typography>입양 전 확인</Typography>

        <Stack spacing={1}>
          <Typography level="body-sm" sx={{ whiteSpace: 'pre-line' }}>
            {`서울동물복지지원센터 홈페이지에서 '입양대기동물'를 확인합니다.
            *입양대기동물의 다양한 사진과 영상은 서울동물복지지원센터 유튜브에서도 보실 수 있어요`}
          </Typography>
        </Stack>
      </Step>
      <Step indicator={<StepIndicator>2</StepIndicator>}>
        <Typography>입양 전 교육</Typography>

        <Stack spacing={1}>
          <Typography level="body-sm" sx={{ whiteSpace: 'pre-line' }}>
            {`입양을 희망하시는 분은 서울시 평생학습포털의 "반려동물 입양교육과 반려동물 돌봄 교육"을 이수해 주세요.
            (교육 신청 안내 바로가기)`}
          </Typography>
        </Stack>
      </Step>
      <Step indicator={<StepIndicator>3</StepIndicator>}>
        <Typography>입양상담예약</Typography>

        <Stack spacing={1}>
          <Typography level="body-sm" sx={{ whiteSpace: 'pre-line' }}>
            {`방문 전 유선으로 일정예약을 해주시고 센터로 방문해주세요..
            * 유선예약필수`}
          </Typography>
        </Stack>
      </Step>
      <Step indicator={<StepIndicator>4</StepIndicator>}>
        <Typography>입양 진행</Typography>

        <Stack spacing={1}>
          <Typography level="body-sm" sx={{ whiteSpace: 'pre-line' }}>
            {`입양은 1~2회 이상 입양상담 및 개체만남을 통해 진행됩니다.
            (입양 후 파양은 불가합니다. 만남을 통해 신중하게 결정해 주세요)`}
          </Typography>
        </Stack>
      </Step>
      <Step indicator={<StepIndicator>5</StepIndicator>}>
        <Typography>입양 후기 공유</Typography>

        <Stack spacing={1}>
          <Typography level="body-sm" sx={{ whiteSpace: 'pre-line' }}>
            {`보호자님과 입양된 반려견, 반려묘의 행복한 일상을 네이버카페이 주기적으로 올려주세요.
            입양 대기 중인 아이들의 입양과 인식 개선에 많은 도움이 됩니다.`}
          </Typography>
        </Stack>
      </Step>
    </Stepper>
  );
};

export default AbandonmentInfomation;
