import { ChangeEvent } from "react";
import { IForm } from "../../../type/shareRoomForm";

interface IProps {
  form: IForm;
  onChangeTitleHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Title = ({ form, onChangeTitleHandler }: IProps) => {
  return (
    <div className="flex justify-center items-center">
      <input
        type="text"
        placeholder="일정 제목을 입력하세요"
        className="px-4 py-4 w-[15rem] outline-none text-lg placeholder:text-base placeholder:font-light"
        maxLength={20}
        onChange={onChangeTitleHandler}
      />
      <p className="text-xl text-gray-002">{form.title.length} / 20</p>
    </div>
  );
};

export default Title;
