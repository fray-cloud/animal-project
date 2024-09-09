import { Table, AspectRatio } from '@mui/joy';
import { AbandonmentPublic } from '../../../api/callAPI';
import dayjs from 'dayjs';

const DetailView = (props: { data?: AbandonmentPublic }) => {
  const changeDate = (date?: string) => {
    if (date) {
      return dayjs(date, 'YYYYMMDD').format('YYYY.MM.DD');
    } else {
      return '';
    }
  };
  return (
    <Table hoverRow>
      <tbody>
        <tr>
          <td colSpan={1} style={{ width: '70px' }}>
            유기번호
          </td>
          <td colSpan={3}>{props.data?.desertionNo}</td>
        </tr>
        <tr>
          <td colSpan={4} style={{ border: '1px', fontWeight: 'bolder' }}>
            🗓️ 접수 및 공고일
          </td>
        </tr>
        <tr>
          <td colSpan={1}>접수일</td>
          <td colSpan={3}>{changeDate(props.data?.happenDt)}</td>
        </tr>
        <tr>
          <td rowSpan={2}>공고일</td>
          <td style={{ width: '70px' }}>공고시작일</td>
          <td colSpan={2}>{changeDate(props.data?.noticeSdt)}</td>
        </tr>
        <tr>
          <td>공고종료일</td>
          <td colSpan={2}>{changeDate(props.data?.noticeEdt)}</td>
        </tr>
        <tr>
          <td colSpan={4} style={{ border: '1px', fontWeight: 'bolder' }}>
            📍 발견 및 보호소
          </td>
        </tr>
        <tr>
          <td>발견장소</td>
          <td colSpan={3}>{props.data?.happenPlace}</td>
        </tr>
        <tr>
          <td rowSpan={3}>보호소</td>
          <td>보호소명</td>
          <td colSpan={2}>{props.data?.careNm}</td>
        </tr>
        <tr>
          <td>주소</td>
          <td colSpan={2}>{props.data?.careAddr}</td>
        </tr>
        <tr>
          <td>전화번호</td>
          <td colSpan={2}>
            <a href={`tel:${props.data?.careTel}`}>{props.data?.careTel}</a>
          </td>
        </tr>
        <tr>
          <td rowSpan={3}>관할처</td>
          <td>기관명</td>
          <td colSpan={2}>{props.data?.orgNm}</td>
        </tr>
        <tr>
          <td>담당자</td>
          <td colSpan={2}>{props.data?.chargeNm}</td>
        </tr>
        <tr>
          <td>연락처</td>
          <td colSpan={2}>
            <a href={`tel:${props.data?.officetel}`}>{props.data?.officetel}</a>
          </td>
        </tr>
        <tr>
          <td colSpan={4} style={{ border: '1px', fontWeight: 'bolder' }}>
            🔎 상세정보
          </td>
        </tr>
        <tr>
          <td colSpan={4}>
            <AspectRatio>
              <img src={props.data?.popfile} />
            </AspectRatio>
          </td>
        </tr>
        <tr>
          <td>품종</td>
          <td colSpan={3}>{props.data?.kindCd}</td>
        </tr>
        <tr>
          <td>색상</td>
          <td>{props.data?.colorCd}</td>
          <td style={{ width: '100px' }}>체중</td>
          <td>{props.data?.weight}</td>
        </tr>
        <tr>
          <td>나이</td>
          <td>{props.data?.age}</td>
          <td>성별(중성화여부)</td>
          <td>
            {props.data?.sexCd == 'F' ? '여' : 'M' ? '남' : '미상'}(
            {props.data?.neuterYn == 'U' ? '미상' : 'Y' ? 'Y' : 'N'})
          </td>
        </tr>
        <tr>
          <td>특징</td>
          <td colSpan={3}>{props.data?.specialMark}</td>
        </tr>
        <tr>
          <td>특이사항</td>
          <td colSpan={3}>{props.data?.noticeComment ?? null}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default DetailView;
