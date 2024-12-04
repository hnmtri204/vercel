import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "react-toastify";

const AddPatient = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // Initialize navigate

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true); // Set loading to true during the request

        try {
            // Tạo đối tượng dữ liệu để gửi
            const data = {
                name,
                phone,
                email,
                password,
            };

            const response = await axios.post("http://localhost:5000/patient/create", data, {
                headers: { "Content-Type": "application/json" }, // Đặt header cho JSON
            });

            setLoading(false); // Set loading to false after the request

            if (response.data.success) {
                toast.success("Thêm bệnh nhân thành công!");
                // Reset các trường
                setName("");
                setPhone("");
                setEmail("");
                setPassword("");
            } else {
                toast.error("Thêm bệnh nhân thất bại!");
            }
        } catch (error) {
            setLoading(false); // Set loading to false in case of error
            toast.error("Email đã được sử dụng!" || error.response?.data.message);
            // toast.error(error.response?.data.message || "Đã xảy ra lỗi.");
            console.log(error.response?.data || error.message);
        }
    };

    const onCancelHandler = () => {
        navigate("/patient-list"); // Navigate to the patient list page
    };

    return (
        <form onSubmit={onSubmitHandler} className="m-5 w-full">
            <div className="flex justify-between items-center mb-4">
                <p className="md:text-3xl text-xl font-bold text-[#0091a1]">Thêm bệnh nhân</p>
            </div>
            <div className="overflow-x-auto bg-white p-4 rounded-md shadow-md">
                <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-500">
                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex-1 flex flex-col gap-1">
                            <p className="font-bold">Tên:</p>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                className="border rounded px-3 py-2"
                                type="text"
                                placeholder="Họ và Tên"
                                required
                            />
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p className="font-bold">Số điện thoại:</p>
                            <input
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                                className="border rounded px-3 py-2"
                                type="tel"
                                placeholder="(+84) 123 456 789"
                                required
                            />
                        </div>
                    </div>

                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex-1 flex flex-col gap-1">
                            <p className="font-bold">Email:</p>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className="border rounded px-3 py-2"
                                type="email"
                                placeholder="Email bệnh nhân"
                                required
                            />
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p className="font-bold">Mật khẩu</p>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className="border rounded px-3 py-2"
                                type="text"
                                placeholder="Xy6abG"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mt-4">
                    <button
                        type="submit"
                        className={`bg-primary px-10 py-3 text-white rounded-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            "Tạo"
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={onCancelHandler}
                        className="bg-gray-300 px-10 py-3 text-black rounded-full hover:bg-gray-400"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddPatient;
