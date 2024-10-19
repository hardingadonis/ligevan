import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { getAllCourse } from '@/services/api/course'; 
import { Course } from '@/schemas/course.schema';
import '@/assets/styles/ListCourse.css';

interface DataType {
  key: string;
  code: string;
  title: string;
  price: number;
  action: JSX.Element;
}

const ListCourses: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);

  // Fetch courses data
  const fetchData = async () => {
    try {
      const courses: Course[] = await getAllCourse();
      const tableData = mapCoursesToTableData(courses);
      setData(tableData);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const mapCoursesToTableData = (courses: Course[]): DataType[] => {
    return courses.map((course, index) => ({
      key: (index + 1).toString(),
      code: course.code,
      title: course.title,
      price: course.price,
      action: renderActions(course._id),
    }));
  };

  // Render action buttons for each course
  const renderActions = (id: string): JSX.Element => (
    <>
      <Button type="primary" onClick={() => handleEdit(id)} style={{ marginRight: 8 }}>
        Edit
      </Button>
      <Button
        type="primary"
        danger
        onClick={() => handleDelete(id)}
        style={{ backgroundColor: 'red', borderColor: 'red' }}
      >
        Delete
      </Button>
    </>
  );

  useEffect(() => {
    fetchData();
  }, []);

  // Handle edit action
  const handleEdit = (id: string) => {
    console.log(`Chỉnh sửa khóa học với id: ${id}`);
  };

  // Handle delete action
  const handleDelete = (id: string) => {
    console.log(`Xóa khóa học có id: ${id}`);
  };

  // Handle creating new course
  const handleCreateNewCourse = () => {
    console.log('Tạo khóa học mới');
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
      title: 'Mã khóa học',
      dataIndex: 'code',
      sorter: {
        compare: (a, b) => a.code.localeCompare(b.code),
        multiple: 3,
      },
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      sorter: {
        compare: (a, b) => a.title.localeCompare(b.title),
        multiple: 2,
      },
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 1,
      },
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
    },
  ];

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div className="list-courses-container">
      <div className="list-courses-header">
        <h1 className="courses-title">Tất cả các khóa học</h1>
      </div>
      <div className="list-courses-header">
        <Button type="primary" onClick={handleCreateNewCourse}>
				Tạo khóa học mới
        </Button>
      </div>
      <div className="table-wrapper">
        <Table<DataType>
          columns={columns}
          dataSource={data}
          onChange={onChange}
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: 'Không có dữ liệu có sẵn' }}
        />
      </div>
    </div>
  );
};

export default ListCourses;
