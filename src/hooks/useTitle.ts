import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { createShareRoomForm } from "../store/createShareRoomForm";

const useTitle = (value = "") => {
    const [title, setTitle] = useState(value);
    const [shareRoomForm, setShareRoomForm] = useRecoilState(createShareRoomForm);

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        setShareRoomForm({...shareRoomForm, title : e.target.value});
    }

    return [title, onChangeTitleHandler] as const;
}

export default useTitle;