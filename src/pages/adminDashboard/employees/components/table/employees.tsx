import React, { createRef, useState, Fragment, useEffect } from 'react';
import MaterialTable from 'material-table';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import pt from 'date-fns/locale/pt-BR';
import { withStyles } from '@material-ui/core/styles';
import { Key as KeyIcon } from '@styled-icons/ionicons-sharp';
import { Reload as ReloadIcon } from '@styled-icons/open-iconic';
import { PersonRemove as RemoveUserIcon } from '@styled-icons/material';
import { companyApi, TypeMember } from '../../../../../services';
import { TypeEmployee } from '../../../../../models/department';
import Localization from './config/localization';
import MTableFilterRow from '../filter';
import tableIcons from './config/icons';
import useCompany from '../../../../../hooks/useCompany';
import HiringModal from '../../../components/assignTeamModal/company';
import PermissionModal from '../../../../../components/permission/modal';
import useStyles from './styles';
import snackbarUtils from '../../../../../utils/functions/snackbarUtils';
import Avatar from '@material-ui/core/Avatar';
import RemoveUserModal from '../removeUserModal';
import Tooltip from '@material-ui/core/Tooltip';
// import DeleteCupom from '../../components/Dialogs/DeleteCupom';

type Props = {
    data: Array<TypeEmployee>;
};

const TableEmployees: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const PurpleSwitch = withStyles({
        switchBase: {
            color: ' #8D297E',
            '&$checked': {
                color: '#8D297E',
            },
            '&$checked + $track': {
                backgroundColor: '#8D297E',
            },
        },
        checked: {},
        track: {},
    })(Switch);
    const { company } = useCompany();
    const [data, setData] = useState<TypeMember[]>();
    const [dataChanged, setDataChanged] = useState<Boolean>(false);
    // const { data } = props;
    const tableRef = createRef();
    const [filter, setFilter] = useState<boolean>(false);
    const [selectedEmployee, setSelectedEmployee] = useState<TypeMember>();
    const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(!filter);
    };
    //Atualizar dados
    const reloadTable = () => {
        setDataChanged(!dataChanged);
    };
    //Hiring Modal
    const [showHiringModal, setShowHiringModal] = useState<boolean>(false);
    const handleOpenHiringModal = () => {
        setShowHiringModal(true);
    };
    //Permission Modal
    const [showPermissionModal, setShowPermissionModal] = useState<boolean>(
        false
    );
    const handleOpenPermissionModal = (rowData: TypeMember) => {
        setSelectedEmployee(rowData);
        setShowPermissionModal(true);
    };
    //Remove user modal
    const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
    const handleOpenRemoveModal = (rowData: TypeMember) => {
        setSelectedEmployee(rowData);
        setShowRemoveModal(true);
    };
    const handleRemove = (member: TypeMember) => {
        const aux: Array<TypeMember> = [];

        data!.forEach(item => {
            if (item.userId !== member.userId) aux.push(item);
        });

        setData(aux);
    };

    const getData = () => {
        if (company) {
            companyApi
                .findAllEmployees(company.companyId)
                .then(response => {
                    console.log(response.data);
                    setData(response.data);
                })
                .catch(error => {
                    snackbarUtils.error(
                        'Erro ao tentar carregar os funcionários'
                    );
                });
        }
    };

    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, [dataChanged]);

    return (
        <Fragment>
            {data && (
                <Fragment>
                    <MaterialTable
                        icons={tableIcons}
                        //onRowClick={(event, rowData) => console.log(rowData)}
                        isLoading={data.length === 0}
                        localization={Localization}
                        title="Cupoms cadastrados"
                        options={{
                            filtering: true,
                            headerStyle: {
                                backgroundColor: '#F5F5F5',
                                color: '#606060',
                            },
                            rowStyle: {
                                backgroundColor: '#F5F5F5',
                                fontFamily: 'Roboto-slab',
                                color: '#606060',
                                fontSize: '1rem',
                            },
                            padding: 'default',
                            pageSizeOptions: [5, 10, 20, 30],
                        }}
                        tableRef={tableRef}
                        columns={[
                            {
                                title: 'Imagem',
                                width: 20,
                                field: 'url',
                                sorting: false,
                                filtering: false,
                                render: data => (
                                    <Avatar
                                        src={data.image?.path || undefined}
                                        alt="Imagem"
                                    />
                                ),
                            },
                            {
                                title: 'Nome',
                                field: 'name',
                                sorting: true,
                                type: 'string',
                                cellStyle: { textAlign: 'left' },
                            },
                            {
                                title: 'CPF',
                                field: 'cpf',
                                sorting: false,
                                type: 'string',
                                cellStyle: { textAlign: 'left' },
                            },
                            // {
                            //     title: 'Admissão',
                            //     field: 'admission',
                            //     sorting: true,
                            //     type: 'date',
                            //     dateSetting: { locale: 'pt-BR' },
                            //     cellStyle: { textAlign: 'left' },
                            // },
                            {
                                title: 'Cargo',
                                field: 'permission',
                                sorting: true,
                                type: 'string',
                                cellStyle: { textAlign: 'left' },
                            },
                            {
                                title: 'Permissões',
                                filtering: false,
                                sorting: false,
                                field: 'url',
                                width: 20,
                                render: rowData => (
                                    <Button
                                        className={classes.button}
                                        onClick={() =>
                                            handleOpenPermissionModal(rowData)
                                        }
                                    >
                                        <KeyIcon size={21} color={'white'} />
                                    </Button>
                                ),
                            },

                            {
                                title: 'Remover',
                                filtering: false,
                                sorting: false,
                                field: 'url',
                                width: 20,
                                render: rowData => (
                                    <Button
                                        className={classes.button}
                                        onClick={() =>
                                            handleOpenRemoveModal(rowData)
                                        }
                                    >
                                        <RemoveUserIcon
                                            size={20}
                                            color={'white'}
                                        />
                                    </Button>
                                ),
                            },
                        ]}
                        data={data}
                        components={{
                            FilterRow: props => {
                                return (
                                    <MTableFilterRow
                                        {...props}
                                        localization={{
                                            dateTimePickerLocalization: pt,
                                        }}
                                        filter={filter}
                                    />
                                );
                            },
                            Toolbar: () => (
                                <Grid
                                    className={classes.header}
                                    container
                                    item
                                    xs={12}
                                >
                                    <Grid item xs={4}>
                                        <Typography
                                            className={classes.tableTitle}
                                        >
                                            Meus Funcionários
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControlLabel
                                            control={
                                                <PurpleSwitch
                                                    checked={filter}
                                                    onChange={
                                                        handleChangeFilter
                                                    }
                                                    name="checkedA"
                                                />
                                            }
                                            label="Filtrar"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Button
                                            className={classes.button}
                                            onClick={handleOpenHiringModal}
                                        >
                                            Contratar Funcionário
                                        </Button>
                                    </Grid>
                                    <Grid
                                        container
                                        item
                                        xs={1}
                                        alignItems="center"
                                        justify="center"
                                    >
                                        <Tooltip
                                            aria-label="Recarregar dados"
                                            title="Recarregar dados"
                                            arrow
                                            placement="top"
                                        >
                                            <Grid item xs={6}>
                                                <ReloadIcon
                                                    className={
                                                        classes.iconReload
                                                    }
                                                    onClick={() =>
                                                        reloadTable()
                                                    }
                                                    size={'1.6rem'}
                                                    color={'#B03E9F'}
                                                />
                                            </Grid>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            ),
                        }}
                    />
                    <HiringModal
                        isOpen={showHiringModal}
                        setIsOpen={setShowHiringModal}
                        selectedValues={data}
                    />
                    <PermissionModal
                        isOpen={showPermissionModal}
                        setIsOpen={setShowPermissionModal}
                        employee={selectedEmployee!}
                        reloadTable={reloadTable}
                    />
                    <RemoveUserModal
                        company={company}
                        isOpen={showRemoveModal}
                        member={selectedEmployee}
                        onRemove={handleRemove}
                        setIsOpen={setShowRemoveModal}
                    />
                </Fragment>
            )}
        </Fragment>
    );
};

export default TableEmployees;
