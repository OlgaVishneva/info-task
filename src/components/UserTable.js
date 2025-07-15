import React, { useEffect, useState } from 'react';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
    const [filter, setFilter] = useState({ name: '', age: '', gender: '', phone: '', email: '', country: '', city: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://dummyjson.com/users');
            const data = await response.json();
            setUsers(data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const sortUsers = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
            direction = '';
        }
        setSortConfig({ key, direction });
    };

    const sortedUsers = () => {
        let sortableUsers = [...users];
        if (sortConfig.key) {
            sortableUsers.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableUsers;
    };

    const filteredUsers = () => {
        return sortedUsers().filter(user => {
            return (
                (user.firstName.toLowerCase().includes(filter.name.toLowerCase()) ||
                user.lastName.toLowerCase().includes(filter.name.toLowerCase())) &&
                (filter.age ? user.age === Number(filter.age) : true) &&
                (filter.gender ? user.gender === filter.gender : true) &&
                (filter.phone ? user.phone.includes(filter.phone) : true) &&
                (filter.email ? user.email.includes(filter.email) : true) &&
                (filter.country ? user.address.country.toLowerCase().includes(filter.country.toLowerCase()) : true) &&
                (filter.city ? user.address.city.toLowerCase().includes(filter.city.toLowerCase()) : true)
            );
        });
    };

    const paginatedUsers = () => {
        const startIndex = (currentPage - 1) * usersPerPage;
        return filteredUsers().slice(startIndex, startIndex + usersPerPage);
    };

    const handleRowClick = (user) => {
        setSelectedUser(user);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    return (
        <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="ФИО"
                    value={filter.name}
                    onChange={(e) => setFilter({ ...filter, name: e.target.value })}
                    style={{ padding: '10px', marginRight: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                <input
                    type="number"
                    placeholder="Возраст"
                    value={filter.age}
                    onChange={(e) => setFilter({ ...filter, age: e.target.value })}
                    style={{ padding: '10px', marginRight: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <select 
                    onChange={(e) => setFilter({ ...filter, gender: e.target.value })}
                    style={{ padding: '10px', marginRight: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                    <option value="">Пол</option>
                    <option value="male">Мужской</option>
                    <option value="female">Женский</option>
                </select>
                <input
                    type="text"
                    placeholder="Номер телефона"
                    value={filter.phone}
                    onChange={(e) => setFilter({ ...filter, phone: e.target.value })}
                    style={{ padding: '10px', marginRight: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={filter.email}
                    onChange={(e) => setFilter({ ...filter, email: e.target.value })}
                    style={{ padding: '10px', marginRight: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    type="text"
                    placeholder="Страна"
                    value={filter.country}
                    onChange={(e) => setFilter({ ...filter, country: e.target.value })}
                    style={{ padding: '10px', marginRight: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    type="text"
                    placeholder="Город"
                    value={filter.city}
                    onChange={(e) => setFilter({ ...filter, city: e.target.value })}
                    style={{ padding: '10px', marginRight: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th onClick={() => sortUsers('lastName')} style={tableHeaderStyle}>Фамилия</th>
                        <th onClick={() => sortUsers('firstName')} style={tableHeaderStyle}>Имя</th>
                        <th onClick={() => sortUsers('fatherName')} style={tableHeaderStyle}>Отчество</th>
                        <th onClick={() => sortUsers('age')} style={tableHeaderStyle}>Возраст</th>
                        <th onClick={() => sortUsers('gender')} style={tableHeaderStyle}>Пол</th>
                        <th onClick={() => sortUsers('phone')} style={tableHeaderStyle}>Телефон</th>
                        <th onClick={() => sortUsers('email')} style={tableHeaderStyle}>Email</th>
                        <th onClick={() => sortUsers('country')} style={tableHeaderStyle}>Страна</th>
                        <th onClick={() => sortUsers('city')} style={tableHeaderStyle}>Город</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedUsers().map(user => (
                        <tr key={user.id} onClick={() => handleRowClick(user)} style={{ cursor: 'pointer', borderBottom: '1px solid #ddd' }}>
                        <td style={tableCellStyle}>{user.lastName}</td>
                        <td style={tableCellStyle}>{user.firstName}</td>
                        <td style={tableCellStyle}>{user.fatherName}</td>
                        <td style={tableCellStyle}>{user.age}</td>
                        <td style={tableCellStyle}>{user.gender}</td>
                        <td style={tableCellStyle}>{user.phone}</td>
                        <td style={tableCellStyle}>{user.email}</td>
                        <td style={tableCellStyle}>{user.address.country}</td>
                        <td style={tableCellStyle}>{user.address.city}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        {selectedUser && (
            <div className="modal" style={modalStyle}>
                <div className="modal-content" style={modalContentStyle}>
                    <span onClick={handleCloseModal} style={closeButtonStyle}>&times;</span>
                    <h2>Информация о пользователе</h2>
                    <p><strong>ФИО:</strong> {`${selectedUser.lastName} ${selectedUser.firstName} ${selectedUser.fatherName}`}</p>
                    <p><strong>Возраст:</strong> {selectedUser.age}</p>
                    <p><strong>Телефон:</strong> {selectedUser.phone}</p>
                    <p><strong>Email:</strong> {selectedUser.email}</p>
                    <p><strong>Адрес:</strong> {`${selectedUser.address.city}, ${selectedUser.address.country}`}</p>
                    <p><strong>Рост:</strong> {selectedUser.height}</p>
                    <p><strong>Вес:</strong> {selectedUser.weight}</p>
                    <img src={selectedUser.avatar} alt="User Avatar" style={{ width: '100px', height: '100px' }} />
                </div>
            </div>
        )}
        <div style={{ marginTop: '20px' }}>
            {Array.from({ length: Math.ceil(filteredUsers().length / usersPerPage) }, (_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    style={{ marginRight: '5px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    </div>
);
};

const tableHeaderStyle = {
cursor: 'pointer', 
textAlign: 'center', 
border: '1px solid #ddd', 
padding: '10px', 
minWidth: '50px' // Минимальная ширина столбца
};

const tableCellStyle = {
textAlign: 'center', 
border: '1px solid #ddd', 
padding: '10px'
};

const modalStyle = {
display: 'flex',
position: 'fixed',
zIndex: 1,
left: 0,
top: 0,
width: '100%',
height: '100%',
overflow: 'auto',
backgroundColor: 'rgba(0, 0, 0, 0.5)',
};

const modalContentStyle = {
backgroundColor: '#fefefe',
margin: '15% auto',
padding: '20px',
border: '1px solid #888',
width: '80%',
};

const closeButtonStyle = {
color: '#aaa',
float: 'right',
fontSize: '28px',
fontWeight: 'bold',
cursor: 'pointer',
};

export default UserTable;