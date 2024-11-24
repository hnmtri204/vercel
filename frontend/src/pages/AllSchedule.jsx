import { Scheduler } from "@bitnoi.se/react-scheduler";
import React, { useEffect, useState } from 'react';

const AllSchedule = ({ doctorId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!doctorId) {
            setError('Không tìm thấy ID của bác sĩ.');
            return;
        }

        setIsLoading(true);
        setError(null);

        const apiUrl = `http://localhost:5000/get-schedule-doctor/${doctorId}`;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((fetchedData) => {
                if (Array.isArray(fetchedData)) {
                    setData(fetchedData);
                } else {
                    console.error('Dữ liệu nhận được không phải là một mảng:', fetchedData);
                    setError('Dữ liệu không đúng định dạng mong đợi.');
                }
            })
            .catch((error) => {
                console.error('Lỗi khi tải dữ liệu:', error);
                setError('Đã xảy ra lỗi khi tải dữ liệu.');
            })
            .finally(() => setIsLoading(false));
    }, [doctorId]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Đặt lịch hẹn</h1>

            {/* Hiển thị lỗi nếu có */}
            {error && (
                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                    <span className="font-medium">Lỗi:</span> {error}
                </div>
            )}

            {/* Hiển thị trạng thái tải dữ liệu */}
            {isLoading ? (
                <div className="text-center text-gray-500">Đang tải dữ liệu...</div>
            ) : (
                <div className="relative bg-white rounded-lg shadow-md p-4 mb-4 mx-auto h-[75vh] overflow-hidden">
                    <Scheduler
                        data={data}
                        isLoading={isLoading}
                        onItemClick={(clickedItem) => console.log(clickedItem)}
                        onFilterData={() => {}}
                        onClearFilterData={() => {}}
                        config={{
                            filterButtonState: 0,
                            zoom: 0,
                            lang: "vi",
                            timeZone: "Asia/Ho_Chi_Minh",
                            maxRecordsPerPage: 20,
                        }}
                        style={{
                            height: "100%",
                            width: "100%",
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default AllSchedule;