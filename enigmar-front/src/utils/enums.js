const Enum_Role = {
    admin: 'admin',
    student: 'student',
    leader: 'leader',
  };
  
  const Enum_statusUser = {
    pending: 'pending',
    authorized: 'authorized',
    unauthorized: 'unauthorized',
  };
  
  const Enum_statusProject = {
    active: 'active',
    inactive: 'inactive',
  };
  
  const Enum_phaseProject = {
      started: 'started',
      inProgress: 'inProgress',
      ended: 'ended',
      nulo: 'nulo',
  };

  const Enum_statusEnrollments = {
      accepted: 'accepted',
      rejected: 'rejected',
  }
  
  export { Enum_Role, Enum_statusUser, Enum_statusProject, Enum_phaseProject, Enum_statusEnrollments};