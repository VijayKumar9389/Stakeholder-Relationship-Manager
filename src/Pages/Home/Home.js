import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import './Home.scss';
import { SiCivicrm } from "react-icons/si";



import Sidebar from '../../Components/Sidebar/Sidebar';
import StakeholderTable from '../../Components/Table/StakeholderTable/StakeholderTable';
import Input from '../../Components/Input/Input';
import FilterMenu from '../../Components/Filters/Filter';
import Report from '../../Components/Reports/Report';

function Home({ LogOut }) {

    const [filter, setFilter] = useState(0);
    const [search, setSearch] = useState("");
    const [tableSearch, setTableSearch] = useState('1');
    const Location = useSelector((state) => state.filter.location);
    const tblSearch = useSelector((state) => state.filter.search.txt);
    const searchType = useSelector((state) => state.filter.search.type);

    function downloadFile() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tracts/getExcel/download`, {
            method: 'GET',
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'blob',
                "access-token": localStorage.getItem("access-token")
            },
        }).then((response) => {
            const link = document.createElement('a');
            const fileName = 'Project.xlsx';
            link.setAttribute('download', fileName);
            link.href = URL.createObjectURL(new Blob([response.data]));
            document.body.appendChild(link);
            link.click();
            link.remove();
        });
    }

    return (
        <div className='home-container'>
            {/* <Sidebar /> */}
            <div className='home-body'>
                <div className='header-home'>
                    <div className='heading-wrapper'>
                        <div className='sidebar-heading'>
                            <SiCivicrm size="3rem" color='#68bd45' />
                            <p>Triton</p>
                            <a>CRM</a>
                        </div>
                    </div>
                    <div className='menu-wrapper'>
                        <div className='nav-wrapper'>
                            <ul className='nav-menu'>
                                <li>Stakeholders</li>
                                <li>Reports</li>
                                <li>Project</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Report />
                <FilterMenu isOpen={false} />
                <Input />
                <StakeholderTable Search={search} />
            </div>
        </div>
    );
}

export default Home;