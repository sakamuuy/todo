import styled from 'styled-components'
import { getToday } from '../../utils/date'
import { Droppable } from 'react-beautiful-dnd';
import Dummy from './Dummy';
import { useState } from 'react';

const StyledSchedule = styled.div`
  // height: calc(100% - 220px);
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
  // grid-template-rows: repeat(24, 24px);
  overflow-y: scroll;
`;

const SchedulColumns = styled.div`
  display: block;
  border: 1px solid #eee;
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

const DateController = styled.div`
  display: flex;
  justify-content: space-between;

`;

const genArray = (num: number) => {
  const ret = [];
  for (let i=0; i<num; i++) {
    ret.push(i);
  }

  return ret;
}

const Schedule = () => {
  const [startDay, setStartDay] = useState(getToday())

  const changeStartDay = (gap: number) => {
    setStartDay((getToday(gap)))
  }

  return  (
    <StyledSchedule>
      <ScheduleHeader>
        <HeaderCol></HeaderCol>
        {genArray(7).map((_,i) => (
          <HeaderCol key={startDay.date + i}>{startDay.date + i}日</HeaderCol>
        ))}
      </ScheduleHeader>
      <DateController>
        <div>
          <button onClick={() => changeStartDay(-7)}>＜＜</button>
          <button onClick={() => changeStartDay(-1)} style={{marginLeft: '8px'}}>＜</button>
        </div>
        <div>
          <button onClick={() => changeStartDay(1)} style={{marginRight: '8px'}}>＞</button>
          <button onClick={() => changeStartDay(7)}>＞＞</button>
        </div>
      </DateController>
      <ScheduleBody>
        {genArray(8).map((_,i) => {
          return (
            <SchedulColumns>
              <Droppable droppableId={`day-${startDay.year}-${startDay.month}-${startDay.date + i}`}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {genArray(24).map((_,j) => {
                      let time = ''
                      if (!i) {
                        time = j>9? `${j}:00` : `0${j}:00`
                      }
                      return (
                        <Dummy 
                          id={`${startDay.year}-${startDay.month}-${startDay.date}:${i/8}`/** yyyy-mm-dd:h */} 
                          key={`col-${i}`} 
                          index={i}>
                            {time}
                        </Dummy>
                      )
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </SchedulColumns>
          )
        })}
      </ScheduleBody>
    </StyledSchedule>
  );
};

export default Schedule;