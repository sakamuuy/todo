import styled from 'styled-components'
import { getToday } from '../../utils/date'
import { Droppable } from 'react-beautiful-dnd';

const StyledSchedule = styled.div`
  height: calc(100% - 220px);
  // overflow-y: scroll;
`;

const ScheduleHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  padding: 8px 0;
`;

const ScheduleBody = styled.div`
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
      <ScheduleHeader>
        <HeaderCol></HeaderCol>
        {genArray(7).map((_,i) => (
          <HeaderCol key={startDay.date + i}>{startDay.date + i}日</HeaderCol>
        ))}
      </ScheduleHeader>
      <Droppable droppableId="schedule">
        {(provided) => (
          <>
            <ScheduleBody {...provided.droppableProps} ref={provided.innerRef}>
            {genArray(24 * 8).map((_,i) => {
              if (i % 8 === 0) {
                // time++;
                return (
                  <Col key={`time-${i}`}>
                    {/* {String(time).length === 1? `0${time}:00` : `${time}:00`} */}
                    {time}
                  </Col>
                );
              }
              return (<Col key={`col-${i}`}></Col>);
            })}
            </ScheduleBody>
            {provided.placeholder}
          </>
        )}
      </Droppable>
    </StyledSchedule>
  );
};

export default Schedule;