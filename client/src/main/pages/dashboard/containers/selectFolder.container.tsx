import { connect, ConnectedProps } from 'react-redux';
import React, { useMemo } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Input, Select, Typography } from 'antd';
import styled from 'styled-components';
import { MainStoreStateType } from '../../../store/types/mainStore.type';
import { selectFolders } from '../../../store/slices/passwords/selectors/password.selectors';

type PropsType = {
    control: Control<any>
} & ConnectorType

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const { Text } = Typography;

const SelectFolderContainer = (props: PropsType) => {
  console.log('D');

  const options = useMemo(() => (
    Object.values(props.currentFolders)
      .map(({ folder }) => ({
        value: folder.id,
        label: folder.name,
      }))
  ), [props.currentFolders]);

  return (
    <Controller
      control={props.control}
      render={({ field, fieldState }) => (
        <StyledContainer>
          <Select
            {...field}
            placeholder="Parent Folder"
            size="large"
            addonBefore="Parent Folder"
            status={fieldState.invalid && 'error'}
          />
          {fieldState.invalid && (
          <Text type="danger">
            {fieldState.error?.message}
          </Text>
          )}
        </StyledContainer>

      )}
      name="parentFolder"
    />
  );
};

const mapStateToProps = (state: MainStoreStateType) => ({
  currentFolders: selectFolders(state),
});

const connector = connect(mapStateToProps);

type ConnectorType = ConnectedProps<typeof connector>;

export default connector(SelectFolderContainer);
