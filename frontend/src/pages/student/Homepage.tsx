import React, { useState } from 'react';
import StudentLayout from '@/layouts/student/notLogin';
import '@/assets/styles/global.css';
import ListCourse from '@/components/student/ListCourse';
import { Center } from '@/models/center';

const HomepageStudent: React.FC = () => {
  const [selectedCenter, setSelectedCenter] = useState<Center | null>(null);

  return (
    <StudentLayout onSelectCenter={setSelectedCenter}>
      <ListCourse selectedCenter={selectedCenter} />
    </StudentLayout>
  );
};

export default HomepageStudent;
