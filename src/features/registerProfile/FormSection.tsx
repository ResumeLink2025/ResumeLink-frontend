import ActionButtonSection from './ActionButtonSection';
import AdditionalInfoSection from './AdditionalInfoSection';
import AddSkillInfoSection from './AddSkillInfoSection';
import BasicInfoSection from './BasicInfoSection';
import ProfileImageSection from './ProfileImageSection';
import type { ImageUploadProps } from './types';

const FormSection = ({ imageUrl, handleUploadFile }: ImageUploadProps) => {
  return (
    <form className="grid grid-cols-2 gap-4 w-full">
      <ProfileImageSection imageUrl={imageUrl} handleUploadFile={handleUploadFile} />
      <BasicInfoSection />
      <AdditionalInfoSection />
      <AddSkillInfoSection />
      <ActionButtonSection />
    </form>
  );
};

export default FormSection;
