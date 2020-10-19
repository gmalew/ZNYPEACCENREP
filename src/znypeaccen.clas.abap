class ZNYPEACCEN definition
  public
  final
  create public .

public section.

  class-methods GET_VERSION
    returning
      value(RT_VERSION) type CHAR0032 .
protected section.
private section.
ENDCLASS.



CLASS ZNYPEACCEN IMPLEMENTATION.


method GET_VERSION.
  CALL FUNCTION 'FUNCTION_EXISTS'
    EXPORTING
      funcname = 'Z_NYPEFTCENCOR_GET_VERSION'
    EXCEPTIONS
       function_not_exist = 1
       others = 2.

  IF sy-subrc EQ 0.
    CALL FUNCTION 'Z_NYPEFTCENCOR_GET_VERSION'
      IMPORTING
        ev_version = rt_version.
  ENDIF.
endmethod.
ENDCLASS.
