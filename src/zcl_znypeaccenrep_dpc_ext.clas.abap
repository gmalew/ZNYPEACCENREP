class ZCL_ZNYPEACCENREP_DPC_EXT definition
  public
  inheriting from ZCL_ZNYPEACCENREP_DPC
  create public .

public section.

  methods /IWBEP/IF_MGW_APPL_SRV_RUNTIME~EXECUTE_ACTION
    redefinition .
protected section.
private section.
ENDCLASS.



CLASS ZCL_ZNYPEACCENREP_DPC_EXT IMPLEMENTATION.


method /IWBEP/IF_MGW_APPL_SRV_RUNTIME~EXECUTE_ACTION.
  DATA lv_system_id         TYPE zft_systems-sid.
  DATA lv_guid_32           TYPE guid_32.

  FIELD-SYMBOLS <fs_parameter> LIKE LINE OF it_parameter.

  IF iv_action_name EQ 'DownloadApplications'.
    READ TABLE it_parameter ASSIGNING <fs_parameter> WITH KEY name = 'Sid'.
    lv_system_id = <fs_parameter>-value.

    CALL FUNCTION 'GUID_CREATE'
      IMPORTING
        ev_guid_32 = lv_guid_32.

    CALL FUNCTION 'Z_NYPEASISCEN_DOWNLOAD_APPS'
      STARTING NEW TASK lv_guid_32
      EXPORTING
        iv_system_id = lv_system_id.
  ENDIF.
endmethod.
ENDCLASS.
