import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { getShareRoomInfoAPI } from "../api/shareRoomAPI";
import { jwtAccessTokenState } from "../state/loginState";
import moment from "moment";
import { Value } from "react-calendar/dist/cjs/shared/types";
import { IShareRoom } from "../type/shareRoom";

interface ISelectedDate {
  startDate: Date,
  endDate: Date,
  printStartDate : string,
  printEndDate : string,
  submitStartDate: string,
  submitEndDate: string,
}

const initialValue: IShareRoom = {
  shareCode:"initial",
  shareName: "",
  imageUrl: "",
  shareId: 1,
  startPoint: "",
  endPoint: "",
  travelEndDate: "",
  travelStartDate: "",
}

const initialSelectedDate: ISelectedDate = {
  startDate: new Date(),
  endDate: new Date(),
  printStartDate : "",
  printEndDate : "",
  submitStartDate: "",
  submitEndDate: "",
}

const usePlanDate = (type: string) => {
  const token = useRecoilValue(jwtAccessTokenState);
  const { shareRoomID } = useParams<string>();
  const [night, setNight] = useState<number>(0);
  const [planDate, setPlanDate] = useState<IShareRoom>(initialValue);
  const [selectedDate, setSelectedDate] = useState<ISelectedDate>(initialSelectedDate);
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);

  const getShareRoomInfo = async () => {
    if (shareRoomID) {
      const result = await getShareRoomInfoAPI(shareRoomID, token);
      setPlanDate(result);
    }
  };

  const calculateNights = (calcType: string) => {
    let startDate;
    let endDate;

    if(calcType === "init"){
       startDate = new Date(planDate.travelStartDate);
       endDate = new Date(planDate.travelEndDate);  
       const printStartDate = moment(planDate.travelStartDate).format("MM.DD");
       const printEndDate = moment(planDate.travelEndDate).format("MM.DD");
       setSelectedDate({...selectedDate, printStartDate , printEndDate});
    }else {
       startDate = new Date(selectedDate.startDate);
       endDate = new Date(selectedDate.endDate);  
      }
      
      let diff = Math.abs(endDate.getTime() - startDate.getTime());
      diff = Math.ceil(diff / (1000 * 60 * 60 * 24));
      setNight(diff);
  }

  const onChangeHandler = (value: Value) => {
    const startDate = value[0];
    const endDate = value[1];
    
    setSelectedDate({...selectedDate, startDate, endDate});
  };

  const onClickCompleteButtonHandler = () => {
    const submitStartDate = moment(selectedDate.startDate).format("YYYY-MM-DD");
    const submitEndDate = moment(selectedDate.endDate).format("YYYY-MM-DD");
    const printStartDate = moment(selectedDate.startDate).format("MM.DD");
    const printEndDate = moment(selectedDate.endDate).format("MM.DD");

    calculateNights("change");
    setSelectedDate({ ...selectedDate, printStartDate, printEndDate, submitStartDate, submitEndDate});
    setOpenCalendar(false);
  }

  const onClickDateCalendar = () => {
    setOpenCalendar(!openCalendar);
  };

  useEffect(() => {       
    if(type === "get"){
      getShareRoomInfo();
    }
  }, []);

  useEffect(() => {
    if(type === "get"){
      calculateNights("init");
    }
  }, [planDate])

  return [night, selectedDate, openCalendar, onChangeHandler, onClickCompleteButtonHandler, onClickDateCalendar] as const;
}

export default usePlanDate;