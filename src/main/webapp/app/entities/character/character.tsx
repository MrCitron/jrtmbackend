import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './character.reducer';
import { ICharacter } from 'app/shared/model/character.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICharacterProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Character = (props: ICharacterProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { characterList, match, loading } = props;
  return (
    <div>
      <h2 id="character-heading">
        <Translate contentKey="jrtmbackendApp.character.home.title">Characters</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="jrtmbackendApp.character.home.createLabel">Create new Character</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {characterList && characterList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="jrtmbackendApp.character.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="jrtmbackendApp.character.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="jrtmbackendApp.character.level">Level</Translate>
                </th>
                <th>
                  <Translate contentKey="jrtmbackendApp.character.race">Race</Translate>
                </th>
                <th>
                  <Translate contentKey="jrtmbackendApp.character.profession">Profession</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {characterList.map((character, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${character.id}`} color="link" size="sm">
                      {character.id}
                    </Button>
                  </td>
                  <td>{character.name}</td>
                  <td>
                    <Translate contentKey={`jrtmbackendApp.CharacterType.${character.type}`} />
                  </td>
                  <td>{character.level}</td>
                  <td>{character.race ? <Link to={`race/${character.race.id}`}>{character.race.id}</Link> : ''}</td>
                  <td>{character.profession ? <Link to={`profession/${character.profession.id}`}>{character.profession.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${character.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${character.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${character.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="jrtmbackendApp.character.home.notFound">No Characters found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ character }: IRootState) => ({
  characterList: character.entities,
  loading: character.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Character);
