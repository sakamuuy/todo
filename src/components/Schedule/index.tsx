import styled from 'styled-components'
import { getToday } from '../../utils/date'
import { Droppable } from 'react-beautiful-dnd';
import Dummy from './Dummy';
import { useEffect, useState, useRef } from 'react';
import { SubscribedTodo } from '../../schema';

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

export const Col = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #eee;
  border-right: 1px solid #eee;
  font-size: 10px;
  font-weight: 700;
  color: #666;
  height: 24px;
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

type DisplayDay = {
  year: number;
  month: number;
  date: number;
}

type Props = {
  todoList: SubscribedTodo[]
}

function Schedule(props: Props) {
  let daysInMonth = useRef(0);
  const [startDay, setStartDay] = useState(getToday())
  const [displayDays, setDisplayDays] = useState<DisplayDay[]>([])

  useEffect(() => {
    setDisplayDays([])
    daysInMonth.current = new Date(startDay.year, startDay.month + 1, 0).getDate()
    const days: DisplayDay[] = genArray(7).map((_,i) => {
      const ret = {
        year: startDay.year,
        month: startDay.month,
        date: startDay.date + i
      }
      if (ret.date > daysInMonth.current) {
        ret.month++;
        ret.date = ret.date - daysInMonth.current;
      }
      return ret;
    })
    setDisplayDays(days)
  }, [startDay])

  const changeStartDay = (gap: number) => {
    setStartDay((getToday(gap)))
  }

  return  (
    <StyledSchedule>
      <ScheduleHeader>
        <HeaderCol></HeaderCol>
        {displayDays.map((d) => (
          <HeaderCol key={d.date}>{d.month}/{d.date}</HeaderCol>
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
        <SchedulColumns>
          {genArray(24).map((_,i) => (
            <Col key={`colH-${i}`}>
              {i>9? `${i}:00` : `0${i}:00`}
            </Col>
          ))}
        </SchedulColumns>
        {displayDays.map((d) => {
          const dayKey = `${d.year}-${d.month}-${d.date}`
          return (
            <SchedulColumns key={dayKey}>
              <Droppable droppableId={dayKey}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {genArray(24).map((_,j) => {
                      return (
                        <Dummy 
                          id={`${d.year}-${d.month}-${d.date}:${j}`/** yyyy-mm-dd:h */} 
                          key={`col-${j}`} 
                          index={j} />
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