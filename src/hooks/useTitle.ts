import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { createShareRoomForm } from "../store/createShareRoomForm";

const useTitle = () => {
    const [title, setTitle] = useState("");
    const [shareRoomForm, setShareRoomForm] = useRecoilState(createShareRoomForm);

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        setShareRoomForm({...shareRoomForm, title : e.target.value});
    }

    const setTitleHandler = (value: string) => {
        setTitle(value);
    }


    return [title, onChangeTitleHandler, setTitleHandler] as const;
}

export default useTitle;