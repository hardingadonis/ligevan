import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { getAllCenter } from '@/services/api/center';
import { Center } from '@/schemas/center.schema';
import '@/assets/styles/ListCenters.css'; // Import file CSS

interface DataType {
  key: string;
  name: string;
  address: string;
  phone: string;
  thaotac: JSX.Element;
}

const ListCenters: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);

  // Extract fetchData function
  const fetchData = async () => {
    try {
      const centers: Center[] = await getAllCenter();
      const tableData = mapCentersToTableData(centers);
      setData(tableData);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách trung tâm:', error);
    }
  };

  // Map centers to table data
  const mapCentersToTableData = (centers: Center[]): DataType[] => {
    return centers.map((center, index) => ({
      key: (index + 1).toString(),
      name: center.name,
      address: center.address,
      phone: center.phone,
      thaotac: renderActions(center._id),
    }));
  };

  // Extract action rendering logic
  const renderActions = (id: string): JSX.Element => (
    <>
      <Button type="primary" onClick={() => handleEdit(id)} style={{ marginRight: 8 }}>
        Chỉnh sửa
      </Button>
      <Button
        type="primary"
        danger
        onClick={() => handleDelete(id)}
        style={{ backgroundColor: 'red', borderColor: 'red' }}
      >
        Xóa
      </Button>
    </>
  );

  useEffect(() => {
    fetchData();
  }, []);

  // Handle edit action
  const handleEdit = (id: string) => {
    console.log(`Chỉnh sửa trung tâm có id: ${id}`);
  };

  // Handle delete action
  const handleDelete = (id: string) => {
    console.log(`Xóa trung tâm có id: ${id}`);
  };

  // Handle create new center
  const handleCreateNewCenter = () => {
    console.log('Tạo trung tâm mới');
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'key',
      sorter: {
        compare: (a, b) => parseInt(a.key) - parseInt(b.key),
        multiple: 4,
      },
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 3,
      },
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      sorter: {
        compare: (a, b) => a.address.localeCompare(b.address),
        multiple: 2,
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      sorter: {
        compare: (a, b) => a.phone.localeCompare(b.phone),
        multiple: 1,
      },
    },
    {
      title: 'Thao tác',
      dataIndex: 'thaotac',
    },
  ];

  const onChange: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div className="list-centers-container">
      <div className="list-centers-header">
        <h1 className="center-title">Tất cả các trung tâm</h1>
      </div>
      <div className="list-centers-header">
        <Button type="primary" onClick={handleCreateNewCenter}>
          Tạo trung tâm mới
        </Button>
      </div>
      <div className="table-wrapper">
        <Table<DataType>
          columns={columns}
          dataSource={data}
          onChange={onChange}
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: 'Không có dữ liệu phù hợp' }}
        />
      </div>
    </div>
  );
};

export default ListCenters;
