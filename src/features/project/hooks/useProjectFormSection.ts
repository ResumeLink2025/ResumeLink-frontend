import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { ProjectFormDataType} from '../schemas/projectSchema';
import { projectFormSchema } from '../schemas/projectSchema';

const useProjectFormSection = () => {
  const methods = useForm<ProjectFormDataType>({ resolver: zodResolver(projectFormSchema) });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmitProject = (data: ProjectFormDataType) => {
    console.log('data', data);
  };

  return { methods, errors, register, handleSubmit, onSubmitProject };
};

export default useProjectFormSection;
