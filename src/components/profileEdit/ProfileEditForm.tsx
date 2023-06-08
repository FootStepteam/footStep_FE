import { ReactComponent as ProfileImage } from "../../assets/smile.svg";

function ProfileEditForm() {
	return (
		<section className="m-center w-commonSection h-section">
			<div className="mt-16">
				<form className="flex flex-col items-center m-center w-96">
					<div className="m-center w-[12.5rem] h-[12.5rem]">
						<ProfileImage width={200} height={200} />
					</div>
					<div className="mt-8 flex flex-col w-[18rem]">
						<div className="flex flex-col">
							<label htmlFor="nickname" className="block font-bold text-lg">
								닉네임
							</label>
							<input
								type="text"
								id="nickname"
								defaultValue="덩두"
								className="mt-2 px-4 py-2 border-[#DCDCDC] border rounded-md"
							/>
						</div>
						<div className="flex flex-col mt-6">
							<label className="font-bold text-lg">이메일</label>
							<input
								type="text"
								id="email"
								defaultValue="덩두"
								disabled
								className="mt-2 px-4 py-2 border-[#DCDCDC] border-[#A5A5A5] border rounded-md text-[#A5A5A5]"
							/>
						</div>
						<div className="flex flex-col mt-6">
							<label className="block font-bold text-lg">내 소개</label>
							<textarea
								id="introduce"
								defaultValue="덩두"
								className="mt-2 px-4 py-2  h-40 border-[#DCDCDC] border-[#A5A5A5] border rounded-md resize-none"
							/>
						</div>
					</div>
				</form>
			</div>
		</section>
	);
}

export default ProfileEditForm;
