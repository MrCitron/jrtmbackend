import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IRace } from 'app/shared/model/race.model';
import { getEntities as getRaces } from 'app/entities/race/race.reducer';
import { IProfession } from 'app/shared/model/profession.model';
import { getEntities as getProfessions } from 'app/entities/profession/profession.reducer';
import { getEntity, updateEntity, createEntity, reset } from './character.reducer';
import { ICharacter } from 'app/shared/model/character.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICharacterUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CharacterUpdate = (props: ICharacterUpdateProps) => {
  const [raceId, setRaceId] = useState('0');
  const [professionId, setProfessionId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { characterEntity, races, professions, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/character');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getRaces();
    props.getProfessions();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...characterEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jrtmbackendApp.character.home.createOrEditLabel">
            <Translate contentKey="jrtmbackendApp.character.home.createOrEditLabel">Create or edit a Character</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : characterEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="character-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="character-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="character-name">
                  <Translate contentKey="jrtmbackendApp.character.name">Name</Translate>
                </Label>
                <AvField id="character-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="typeLabel" for="character-type">
                  <Translate contentKey="jrtmbackendApp.character.type">Type</Translate>
                </Label>
                <AvInput
                  id="character-type"
                  type="select"
                  className="form-control"
                  name="type"
                  value={(!isNew && characterEntity.type) || 'PC'}
                >
                  <option value="PC">{translate('jrtmbackendApp.CharacterType.PC')}</option>
                  <option value="NPC">{translate('jrtmbackendApp.CharacterType.NPC')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="levelLabel" for="character-level">
                  <Translate contentKey="jrtmbackendApp.character.level">Level</Translate>
                </Label>
                <AvField id="character-level" type="string" className="form-control" name="level" />
              </AvGroup>
              <AvGroup>
                <Label for="character-race">
                  <Translate contentKey="jrtmbackendApp.character.race">Race</Translate>
                </Label>
                <AvInput id="character-race" type="select" className="form-control" name="race.id">
                  <option value="" key="0" />
                  {races
                    ? races.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="character-profession">
                  <Translate contentKey="jrtmbackendApp.character.profession">Profession</Translate>
                </Label>
                <AvInput id="character-profession" type="select" className="form-control" name="profession.id">
                  <option value="" key="0" />
                  {professions
                    ? professions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/character" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  races: storeState.race.entities,
  professions: storeState.profession.entities,
  characterEntity: storeState.character.entity,
  loading: storeState.character.loading,
  updating: storeState.character.updating,
  updateSuccess: storeState.character.updateSuccess,
});

const mapDispatchToProps = {
  getRaces,
  getProfessions,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CharacterUpdate);
