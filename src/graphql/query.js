import gql from 'graphql-tag';

export const GET_EQUIPMENT_ATTACHMENTS = gql`
  query getEquipmentAttachments($equipmentId: String) {
    _eamequipment {
      attachments(equipmentId: $equipmentId) {
        id
        fileName
        dateAdd
        description
        type
        typeName
        extension
      }
    }
  }
`;
export const GET_INNTERNAL_FILES = gql`
  query getInternlFiles($equipmentId: String) {
  _eam_svc_int {
    getInternlFiles(equipmentId: $equipmentId) {
      errorMessage
      fileName
      success
      size
      fileTitle
    }
  }
}
`;

export const GET_EQUIPMENT_CODE = gql`
  query equipmentCode($equipmentId: String) {
    _eamequipment {
      equipmentData(equipmentId: $equipmentId) { equipmentCode: equipmentId }
    }
  }
`;
