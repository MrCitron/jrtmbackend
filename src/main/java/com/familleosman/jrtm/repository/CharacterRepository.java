package com.familleosman.jrtm.repository;

import com.familleosman.jrtm.domain.Character;
import com.familleosman.jrtm.domain.enumeration.CharacterType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Character entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CharacterRepository extends JpaRepository<Character, Long> {

    @Query("SELECT c FROM Character c WHERE c.type = :type")
    List<Character> getAllCharactersByType(CharacterType type);
}
