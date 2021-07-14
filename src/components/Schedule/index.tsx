import styled from 'styled-components'
import { getToday } from '../../utils/date';

const StyledSchedule = styled.div`
  height: calc(100% - 220px);
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(24, 24px);
  overflow-y: scroll;
`;

const HeaderCol = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  color: #333;
`;

const Col = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-top: 1px solid #eee;
  border-right: 1px solid #eee;
  font-size: 10px;
  font-weight: 700;
  color: #666;
`;

const genArray = (num: number) => {
  const ret = [];
  for (let i=0; i<num; i++) {
    ret.push(i);
  }

  return ret;
}

const Schedule = () => {
  const startDay = getToday();

  let time = 0;
  return  (
    <StyledSchedule>
      <HeaderCol></HeaderCol>
      {genArray(7).map((_,i) => (
        <HeaderCol key={startDay.date + i}>{startDay.date + i}日</HeaderCol>
      ))}
      {genArray(24 * 7).map((_,i) => {
        if (i % 8 === 0) {
          if (i > 0) time++;
          return (
            <Col key={time}>
              {String(time).length === 1? `0${time}:00` : `${time}:00`}
            </Col>
          );
        }
        return (<Col></Col>);
      })}
    </StyledSchedule>
  );
};

export default Schedule;